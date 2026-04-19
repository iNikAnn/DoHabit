// src/utils/initHabits.js
export default function initHabits() {
  const saved = localStorage.getItem('habits');

  if (!saved) return [];

  try {
    const habits = JSON.parse(saved);

    // Ensure completedDays is always an array
    return habits.map((habit) => ({
      ...habit,
      completedDays: Array.isArray(habit.completedDays)
        ? habit.completedDays
        : [],
    }));
  } catch (err) {
    console.error('Failed to load habits', err);
    return [];
  }
}
