import "./HeatMap.css";
import { useHabitsStore } from "../stores/habitsStore";

export default function HeatMap() {
    const habits = useHabitsStore((s) => s.habits || []);

    if (habits.length === 0) {
        return (
            <div className="heatmap-container">
                <h3>Activity — last 30 days</h3>
                <p style={{ opacity: 0.6 }}>No activity yet. Start a habit!</p>
            </div>
        );
    }

    return (
        <div className="heatmap-container">
            <h3>Activity — last 30 days</h3>
            {/* existing heatmap logic stays */}
        </div>
    );
}
