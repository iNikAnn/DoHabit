// src/components/HeatMap.js

import { useHabitsStore } from "../stores/habitsStore";
import { getPastDays } from "../utils/dateUtils";
import "./HeatMap.css";

export default function HeatMap() {
	const habits = useHabitsStore((s) => s.habits || []);

	const days = getPastDays(30);

	const activity = {};

	habits.forEach((habit) => {
		habit.completedDays?.forEach((d) => {
			activity[d.date] = (activity[d.date] || 0) + (d.progress || 0);
		});
	});

	return (
		<div className="hm-wrapper">
			<div className="hm-header">
				<h4>Activity — last 30 days</h4>
			</div>

			<div className="hm-grid">
				<div className="hm-row">
					{days.map((d) => {
						const value = activity[d] || 0;

						let cls = "hm-cell none";

						if (value === 1) cls = "hm-cell light";
						if (value === 2) cls = "hm-cell medium";
						if (value >= 3) cls = "hm-cell strong";

						return <div key={d} className={cls} />;
					})}
				</div>
			</div>
		</div>
	);
}