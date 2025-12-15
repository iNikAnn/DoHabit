import React from "react";
import { useHabitsStore } from "../stores/habitsStore";
import getFormattedDate from "../utils/getFormattedDate";

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
        <div
            style={{
                background: "#1e1e1e",
                padding: "20px",
                margin: "20px",
                borderRadius: "10px",
                color: "#fff",
                border: "1px solid #333",
            }}
        >
            <h3>This Week Summary</h3>

            <p>✓ {totalCompleted} habits completed</p>
            <p>🔥 0 best streak (days)</p>
            <p>📊 {completionPercent}% week completion</p>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                {weekDates.map((d) => (
                    <div
                        key={d}
                        style={{
                            padding: "10px",
                            background: "#2a2a2a",
                            borderRadius: "6px",
                            width: "60px",
                            textAlign: "center",
                            color: "#bbb",
                        }}
                    >
                        <div>{d.slice(5)}</div>
                        <div>•</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
