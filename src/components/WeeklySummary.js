// src/components/WeeklySummary.js

import { useHabitsStore } from "../stores/habitsStore";
import getFormattedDate from "../utils/getFormattedDate";
import "./WeeklySummary.css";

export default function WeeklySummary() {
	const habits = useHabitsStore((s) => s.habits || []);

	const today = new Date();
	const weekDates = [];

	for (let i = 0; i < 7; i++) {
		const d = new Date(today);
		d.setDate(today.getDate() - (6 - i));
		weekDates.push(getFormattedDate(d));
	}

	let totalCompleted = 0;

	habits.forEach((habit) => {
		habit.completedDays?.forEach((day) => {
			if (weekDates.includes(day.date)) {
				totalCompleted += day.progress || 0;
			}
		});
	});

	const completionPercent =
		habits.length === 0
			? 0
			: Math.round((totalCompleted / (habits.length * 7)) * 100);

	return (
		<div className="ws-card">
			<div className="ws-left">
				<h3>This Week Summary</h3>
				<div className="ws-stats">
					<div className="stat">
						<div className="stat-num">{totalCompleted}</div>
						<div className="stat-label">Completions</div>
					</div>

					<div className="stat">
						<div className="stat-num">{completionPercent}%</div>
						<div className="stat-label">Completion</div>
					</div>
				</div>
			</div>

			<div className="ws-right">
				<div className="ws-day-grid">
					{weekDates.map((d) => (
						<div key={d} className="ws-day">
							<div className="day-label">{d.slice(5)}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}