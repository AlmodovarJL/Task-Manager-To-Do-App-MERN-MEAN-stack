// src/components/Charts.js
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Charts({ tasks }) {
  // ✅ Completed vs Pending
  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.length - completed;

  const statusData = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];
  const STATUS_COLORS = ["#28a745", "#dc3545"];

  // ✅ Weekly Productivity (last 7 days)
  const today = new Date();
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toLocaleDateString("en-US", { weekday: "short" });

    const completedCount = tasks.filter(
      (t) =>
        t.completed &&
        t.updatedAt &&
        new Date(t.updatedAt).toDateString() === d.toDateString()
    ).length;

    return { day: dateStr, completed: completedCount };
  });
  const weeklyData = last7Days.reverse();

  // ✅ Category Distribution
  const categories = ["Work", "School", "Personal"];
  const categoryData = categories.map((cat) => ({
    name: cat,
    value: tasks.filter((t) => t.tag === cat).length,
  }));
  const CATEGORY_COLORS = ["#007bff", "#ffc107", "#6f42c1"];

  return (
    <div style={{ textAlign: "center" }}>
      <h5>✅ Completed vs Pending</h5>
      <PieChart width={300} height={250}>
        <Pie
          data={statusData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          dataKey="value"
          label
          isAnimationActive={true}
        >
          {statusData.map((entry, i) => (
            <Cell key={i} fill={STATUS_COLORS[i]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      <h5>📅 Weekly Productivity</h5>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={weeklyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="completed" fill="#28a745" isAnimationActive={true} />
        </BarChart>
      </ResponsiveContainer>

      <h5>📂 Task Categories</h5>
      <PieChart width={300} height={250}>
        <Pie
          data={categoryData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          dataKey="value"
          label
          isAnimationActive={true}
        >
          {categoryData.map((entry, i) => (
            <Cell key={i} fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default Charts;
