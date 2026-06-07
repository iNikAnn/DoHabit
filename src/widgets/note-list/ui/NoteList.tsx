import styles from './NoteList.module.css';
import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { groupBy } from 'es-toolkit';
import { FaCheckCircle } from 'react-icons/fa';
import { useNoteActions } from '../model/useNoteActions';
import { useNoteTags } from '../model/useNoteTags';
import { cardVariants, monthLabelVariants } from '../model/animations';
import SortButton from './sort-button/SortButton';
import TagButton from './tag-button/TagButton';
import { useNoteFormStore } from '@features/manage-note';
import { NoteCard, useNotesStore } from '@entities/note';
import { InformationIcon } from '@shared/assets';
import { MONTHS } from '@shared/const';
import { extractYearsFromTimeline, getYearBoundaries } from '@shared/lib/date-time';
import { useIntersectionObserver } from '@shared/lib/dom';
import { extractUniqueTags } from '@shared/lib/text';
import { Placeholder, SegmentedControl } from '@shared/ui';

interface NoteListProps {
	habitId?: string;
	onScrollTop: (options?: { behavior?: 'auto' | 'smooth' }) => void;
}

const ITEMS_PER_PAGE = 15;
const observerOptions = { scrollMargin: '220px' };

/**
 * Note list widget.
 * Shows notes for a specific habit or general app notes.
 */
function NoteList(props: NoteListProps) {
	const {
		habitId,
		onScrollTop
	} = props;

	// Core data and drawer action hooks
	const notes = useNotesStore((s) => s.notes);

	// Active state and current items collection for bulk edit mode
	const isSelectionMode = useNotesStore((s) => s.isSelectionMode);
	const selectedIds = useNotesStore((s) => s.selectedIds);

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
	const [selectedYear, setSelectedYear] = useState<'All' | number>('All');
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
	 * Extracts a list of years to populate the timeline filter options.
	 */
	const availableYears = useMemo(
		() => extractYearsFromTimeline(scopeNotes, { order: 'desc' }),
		[scopeNotes]
	);

	/**
	 * Filter notes by selected year.
	 */
	const yearNotes = useMemo(() => {
		if (selectedYear === 'All') return scopeNotes;

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
			return tags.includes(activeTag);
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
		options: observerOptions
	});

	// 1. Handle empty state
	if (scopeNotes.length === 0) {
		return (
			<Placeholder
				content={{
					image: <InformationIcon />,
					title: 'Diary is empty',
					description: 'Add your first note to start tracking your progress and thoughts.'
				}}
			/>
		);
	}

	// 2. Render list
	return (
		<div className={styles.container}>
			<div className={styles.toolbar}>
				<SegmentedControl
					options={['All', ...availableYears].map((v) => ({ value: String(v) }))}
					value={String(selectedYear)}
					onChange={(v) => {
						setActiveTag(null);
						setSelectedYear(v === 'All' ? 'All' : Number(v));
					}}
				/>

				<TagButton
					isActive={Boolean(activeTag)}
					onClick={() => {
						if (activeTag) {
							setActiveTag(null);
						} else {
							openNoteTagsMenu({
								title: selectedYear === 'All' ? 'All tags' : `Tags for ${selectedYear}`,
								notes: yearNotes,
								onSetTag: setActiveTag
							});
						}
					}}
				/>

				<SortButton
					order={sortOrder}
					onClick={() => setSortOrder((prev) => prev === 'asc' ? 'desc' : 'asc')}
				/>
			</div>

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
											{MONTHS[monthIndex]}
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

												{/* Render checkmark if note is selected in bulk mode */}
												{(isSelectionMode && selectedIds.has(note.id)) && (
													<div className={styles.selectedIcon}>
														<FaCheckCircle />
													</div>
												)}
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