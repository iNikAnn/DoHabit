import styles from './DiaryPage.module.css';
import { useEffect, useState } from 'react';
import { throttle } from 'es-toolkit';
import DiaryToolbar from './diary-toolbar/DiaryToolbar';
import { NoteForm } from '@widgets/note-form';
import { NoteList } from '@widgets/note-list';
import { scrollToTop } from '@shared/lib/dom';
import { useInitialRouteState } from '@shared/lib/router';

const SCROLL_CONTAINER_ID = 'modalChildrenWrapper';
const SCROLL_THRESHOLD = 600;
const SCROLLING_UP_ATTR = 'data-scrolling-up';

/**
 * Main diary page component.
 */
function DiaryPage() {
	const { habitId, currentStreak } = useInitialRouteState<'DIARY'>();
	const [showScrollTop, setShowScrollTop] = useState(false);

	/**
	 * Tracks the scroll position to toggle the "Up" button,
	 * blocking re-triggers during smooth auto-scrolling.
	 */
	useEffect(() => {
		const el = document.getElementById(SCROLL_CONTAINER_ID);
		if (!el) return;

		const handleScrollTop = throttle(() => {
			if (el.getAttribute(SCROLLING_UP_ATTR) === 'true') {
				if (el.scrollTop < SCROLL_THRESHOLD) {
					el.removeAttribute(SCROLLING_UP_ATTR);
				}

				return;
			}

			setShowScrollTop(el.scrollTop > SCROLL_THRESHOLD);
		}, 400);

		el.addEventListener('scroll', handleScrollTop, { passive: true });

		return () => el.removeEventListener('scroll', handleScrollTop);
	}, []);

	/**
	 * Triggers smooth scrolling to the top of the container.
	 * Instantly hides the action button
	 * and sets a DOM flag to prevent scroll listener interference.
	 */
	const handleScrollToTop = (options?: { behavior?: 'auto' | 'smooth' }) => {
		const el = document.getElementById(SCROLL_CONTAINER_ID);
		if (!el) return;

		el.setAttribute(SCROLLING_UP_ATTR, 'true');
		setShowScrollTop(false);
		scrollToTop(el, options);
	};

	return (
		<div className={styles.diary}>
			<NoteList
				habitId={habitId}
				onScrollTop={handleScrollToTop}
			/>

			<NoteForm
				habitId={habitId}
				streak={currentStreak}
			/>

			<DiaryToolbar
				showScrollTop={showScrollTop}
				onScrollTop={handleScrollToTop}
			/>
		</div>
	);
}

export { DiaryPage };