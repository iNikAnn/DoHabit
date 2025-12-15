// src/utils/toggleCompleteeYeseray.js
import getFormattedDate from './getFormattedDate';

function toggleCompleteYeserday(
  habits,
  habitTitle,
  isTodayCompleted,
  isYesterdayCompleted,
  todayProgress,
  frequency
) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const yDayStr = getFormattedDate(yesterday);

  return habits.map((habit) => {
    let nextHabit = { ...habit };

    if (nextHabit.title === habitTitle) {
      // Ensure completedDays is always an array
      let completedDays = Array.isArray(nextHabit.completedDays)
        ? [...nextHabit.completedDays]
        : [];

      if (isYesterdayCompleted) {
        // Remove yesterday entry
        completedDays = completedDays.filter((day) => day.date !== yDayStr);
      } else {
        // Add / insert yesterday entry
        const completedYesterday = {
          date: yDayStr,
          progress: frequency,
          isCompYdayBtnUsed: true,
        };

        if (isTodayCompleted || todayProgress) {
          // Insert after today's record if present
          completedDays.splice(1, 0, completedYesterday);
        } else {
          // Put yesterday at the front
          completedDays.unshift(completedYesterday);
        }
      }

      nextHabit = {
        ...nextHabit,
        completedDays,
      };
    }

    return nextHabit;
  });
}

export default toggleCompleteYeserday;
