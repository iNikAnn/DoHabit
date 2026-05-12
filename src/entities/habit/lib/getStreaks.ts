import { Streak } from '../../../types/common';
import { CompletedDay } from '../model/types';
import { formatDate } from '@shared/lib';
import { DAY_MS } from '@shared/const';

interface HabitStreaks {
	allStreaks: Streak[];
	currentStreak: number
	longestStreak: number;
}

/**
 * Calculates the current streak, longest streak, and all streaks
 * based on completed days.
 */
function getStreaks(completedDays: CompletedDay[]): HabitStreaks {
	// Return 'zero streaks' if the input array is empty
	if (completedDays[0] === undefined) {
		return { allStreaks: [], currentStreak: 0, longestStreak: 0 };
	}

	const allStreaks: Streak[] = [];
	let currentSeries = 1;
	let streakEnd = completedDays[0].date;

	// Map dates to timestamps
	const daysWithTs = completedDays.map((day) => ({
		date: day.date,
		ts: new Date(day.date).getTime()
	}));

	// Iterate through the array to get ALL streaks
	daysWithTs.forEach((day, i) => {
		const nextDay = daysWithTs[i + 1];

		if (nextDay) {
			// Check if the next day is exactly one day apart
			if ((day.ts - nextDay.ts) / DAY_MS === 1) {
				currentSeries++;
				return; // Keep extending the current streak
			}
		}

		// Streak broken or end of array reached - save the result
		allStreaks.push({
			length: currentSeries,
			start: day.date,
			end: streakEnd
		});

		// Reset for the next streak
		if (nextDay) {
			currentSeries = 1;
			streakEnd = nextDay.date;
		}
	});

	const todayMs = new Date(formatDate(new Date())).getTime();
	const lastCompletedMs = new Date(completedDays[0].date).getTime();

	// Streak is active if the last completion was today or yesterday
	const isStreakActive = (todayMs - lastCompletedMs) / DAY_MS <= 1;
	const currentStreak = isStreakActive ? (allStreaks[0]?.length ?? 0) : 0;

	return {
		allStreaks,
		currentStreak,
		longestStreak: Math.max(0, ...allStreaks.map((s) => s.length))
	};
}

export { getStreaks };