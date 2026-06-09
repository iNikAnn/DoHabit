import styles from './NoteList.module.css';
import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { groupBy, startCase } from 'es-toolkit';
import { useTranslation } from 'react-i18next';
import NoteListToolbar from './toolbar/NoteListToolbar';
import { useNoteActions } from '../model/useNoteActions';
import { useNoteTags } from '../model/useNoteTags';
import { cardVariants, monthLabelVariants } from '../model/animations';
import { useNoteFormStore } from '@features/manage-note';
import { NoteCard, useNotesStore } from '@entities/note';
import { InformationIcon } from '@shared/assets';
import { getMonthLabels, getYearBoundaries } from '@shared/lib/date-time';
import { useIntersectionObserver, useNativeBackClose } from '@shared/lib/dom';
import { extractUniqueTags } from '@shared/lib/text';
import { Placeholder } from '@shared/ui';

interface NoteListProps {
	habitId?: string;
	onScrollTop: (options?: { behavior?: 'auto' | 'smooth' }) => void;
}

const ALL_YEARS_FILTER = 'all';
const ITEMS_PER_PAGE = 15;
const OBSERVER_OPTIONS = { scrollMargin: '220px' };

/**
 * Note list widget.
 * Shows notes for a specific habit or general app notes.
 */
function NoteList(props: NoteListProps) {
	const {
		habitId,
		onScrollTop
	} = props;

	// UI localization
	const { t, i18n } = useTranslation();

	// Core data and drawer action hooks
	const notes = useNotesStore((s) => s.notes);

	// Bulk edit mode subscription
	const isSelectionMode = useNotesStore((s) => s.isSelectionMode);
	const exitSelectionMode = useNotesStore((s) => s.exitSelectionMode);

	// Handle back action to exit selection mode
	useNativeBackClose(isSelectionMode, exitSelectionMode);

	// Management actions to trigger or modify bulk selection state
	const enterSelectionMode = useNotesStore((s) => s.enterSelectionMode);
	const toggleSelect = useNotesStore((s) => s.toggleSelect);

	// Actions and menu controls
	const openNoteForm = useNoteFormStore((s) => s.openEdit);
	const { openNoteMenu } = useNoteActions();
	const { openNoteTagsMenu } = useNoteTags();

	// Pagination state
	const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

	// Active layout filters and sorting rules
	const [selectedYear, setSelectedYear] = useState<'all' | number>(ALL_YEARS_FILTER);
	const [activeTag, setActiveTag] = useState<string | null>(null);
	const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

	/**
	 * Get all notes for the current view context (habit or global).
	 */
	const scopeNotes = useMemo(
		() => notes.filter((n) => habitId ? n.habitId === habitId : !n.habitId),
		[habitId, notes]
	);

	/**
	 * Filter notes by selected year.
	 */
	const yearNotes = useMemo(() => {
		if (selectedYear === ALL_YEARS_FILTER) return scopeNotes;

		const [start, end] = getYearBoundaries(selectedYear);
		return scopeNotes.filter((n) => n.createdAt >= start && n.createdAt < end);
	}, [scopeNotes, selectedYear]);

	/**
	 * Filter year-specific notes by selected hashtag if active.
	 */
	const taggedNotes = useMemo(() => {
		if (!activeTag) return yearNotes;

		return yearNotes.filter((n) => {
			const tags = extractUniqueTags(n.text);
			return tags.includes(activeTag.toLowerCase());
		});
	}, [activeTag, yearNotes]);

	/**
	 * Derives the sorted notes list based on the active sort order.
	 */
	const sortedNotes = useMemo(() => (
		// Reverses pre-sorted ascending array to achieve descending order
		sortOrder === 'desc'
			? taggedNotes.toReversed()
			: taggedNotes
	), [sortOrder, taggedNotes]);

	const visibleNotes = useMemo(
		() => sortedNotes.slice(0, visibleCount),
		[sortedNotes, visibleCount]
	);

	/**
	 * Group notes by year and month string (e.g., '2026-05').
	*/
	const groupedNotes = useMemo(() => {
		const date = new Date();

		return groupBy(visibleNotes, (n) => {
			date.setTime(n.createdAt);
			return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
		})
	}, [visibleNotes]);

	/**
	 * Trigger loading next page when user scrolls to the bottom element.
	 */
	const loadMoreRef = useIntersectionObserver({
		onIntersect: useCallback(() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE), []),
		enabled: visibleNotes.length < yearNotes.length,
		options: OBSERVER_OPTIONS
	});

	const monthLabels = useMemo(() => getMonthLabels(i18n.language), [i18n.language]);

	// 1. Handle empty state
	if (scopeNotes.length === 0) {
		return (
			<Placeholder
				content={{
					image: <InformationIcon />,
					title: t('notes.list.emptyTitle'),
					description: t('notes.list.emptyDesc')
				}}
			/>
		);
	}

	// 2. Render list
	return (
		<div className={styles.container}>
			<NoteListToolbar
				notes={scopeNotes}
				selectedYear={String(selectedYear)}
				hasActiveTag={Boolean(activeTag)}
				order={sortOrder}
				onYearChange={(year) => {
					setActiveTag(null);
					setSelectedYear(year === ALL_YEARS_FILTER ? ALL_YEARS_FILTER : Number(year));
				}}
				onTagAction={() => {
					if (activeTag) {
						setActiveTag(null);
					} else {
						openNoteTagsMenu({
							title: selectedYear === ALL_YEARS_FILTER
								? t('notes.tags.all')
								: t('notes.tags.forYear', { year: selectedYear }),
							notes: yearNotes,
							onSetTag: setActiveTag
						});
					}
				}}
				onOrderChange={() => setSortOrder((prev) => prev === 'asc' ? 'desc' : 'asc')}
			/>

			<div className={styles.noteGroupsWrapper}>
				<AnimatePresence mode='popLayout'>
					{Object.entries(groupedNotes).map(([groupKey, notes], index) => {
						const monthIndex = Number(groupKey.split('-')[1]) - 1;

						return (
							<section key={`${groupKey}_${sortOrder}`}>
								<div
									className={styles.monthLabelWrapper}
									data-first-group={index === 0 ? 'true' : undefined}
								>
									<AnimatePresence mode='popLayout' propagate>
										<motion.small
											key={groupKey}
											className={styles.monthLabel}
											variants={monthLabelVariants}
											initial='initial'
											animate='animate'
											exit='exit'
										>
											{startCase(monthLabels[monthIndex])}
										</motion.small>
									</AnimatePresence>
								</div>

								<ul className={styles.noteList}>
									<AnimatePresence mode='popLayout' propagate>
										{notes.map((note) => (
											<motion.li
												key={`${note.id}_${sortOrder}_${activeTag}`} // Reset layout animation state on list updates to avoid layout shifts
												style={{ position: 'relative' }}
												variants={cardVariants}
												initial='initial'
												animate='animate'
												exit='exit'
												layout='position'
												whileTap={{
													filter: 'brightness(0.8)',
													scale: 0.98,
													transition: { duration: 0.1 }
												}}
											>
												<NoteCard
													note={note}
													onCardClick={() => {
														if (isSelectionMode) toggleSelect(note.id);
														else openNoteMenu({ note, onEdit: openNoteForm });
													}}
													onLongPress={() => {
														if (isSelectionMode) toggleSelect(note.id);
														else enterSelectionMode(note.id);
													}}
													onTagClick={(tag: string) => {
														onScrollTop({ behavior: 'auto' });
														setActiveTag(tag);
													}}
												/>
											</motion.li>
										))}
									</AnimatePresence>
								</ul>
							</section>
						)
					})}
				</AnimatePresence>
			</div>

			{visibleNotes.length < yearNotes.length && (
				<div ref={loadMoreRef} style={{ height: '60px' }} />
			)}
		</div >
	);
}

export { NoteList };