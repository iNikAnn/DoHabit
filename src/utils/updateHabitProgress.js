// src/utils/updateHabitProgress.js
import getFormattedDate from './getFormattedDate';
import checkHabitCompletion from './checkHabitCompletion';

function updateHabitProgress(habits, title) {
  const today = getFormattedDate(new Date());

  return habits.map((habit) => {
    if (habit.title !== title) return habit;

    // Ensure completedDays is always an array
    let completedDays = Array.isArray(habit.completedDays)
      ? [...habit.completedDays]
      : [];

    const isCompleted = checkHabitCompletion(
      completedDays,
      habit.frequency,
      new Date()
    );

    if (isCompleted) {
      // remove today's entry
      completedDays = completedDays.filter((d) => d.date !== today);
    } else {
      const index = completedDays.findIndex((d) => d.date === today);

      if (index !== -1) {
        completedDays[index] = {
          ...completedDays[index],
          progress: (completedDays[index].progress || 0) + 1,
        };
      } else {
        completedDays.unshift({ date: today, progress: 1 });
      }
    }

    return { ...habit, completedDays };
  });
}

export default updateHabitProgress;
