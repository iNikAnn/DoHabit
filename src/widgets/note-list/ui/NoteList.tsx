import styles from './NoteList.module.css';
import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { groupBy } from 'es-toolkit';
import { useNoteActions } from '../model/useNoteActions';
import { cardVariants, monthLabelVariants } from '../model/animations';
import SortButton from './sort-button/SortButton';
import { type Note, NoteCard, useNotesStore } from '@entities/note';
import { InformationIcon } from '@shared/assets';
import { MONTHS } from '@shared/const';
import { extractYearsFromTimeline, getYearBoundaries } from '@shared/lib/date-time';
import { useIntersectionObserver } from '@shared/lib/dom';
import { Placeholder, SegmentedControl } from '@shared/ui';

interface NoteListProps {
	habitId?: string;
	onEdit: (note: Note) => void;
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
		onEdit
	} = props;

	const notes = useNotesStore((s) => s.notes);
	const { openNoteMenu } = useNoteActions();

	const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
	const [selectedYear, setSelectedYear] = useState<'All' | number>('All');
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
	 * Filter by selected year.
	 */
	const yearNotes = useMemo(() => {
		if (selectedYear === 'All') return scopeNotes;

		const [start, end] = getYearBoundaries(selectedYear);
		return scopeNotes.filter((n) => n.createdAt >= start && n.createdAt < end);
	}, [scopeNotes, selectedYear]);

	/**
	 * Derives the sorted notes list based on the active sort order.
	 */
	const sortedNotes = useMemo(() => (
		// Reverses pre-sorted ascending array to achieve descending order
		sortOrder === 'desc'
			? yearNotes.toReversed()
			: yearNotes
	), [sortOrder, yearNotes]);

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
					onChange={(v) => setSelectedYear(v === 'All' ? 'All' : Number(v))}
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
												key={`${note.id}_${sortOrder}`} // Force remount on sorting to prevent motion glitching on short lists
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
													onClick={() => openNoteMenu({ note, onEdit })}
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