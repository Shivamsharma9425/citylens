"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
];

export default function AdminCharts({
  data,
  title,
}: any) {
  return (
    <div
      className="
      rounded-3xl
      border
      border-[#1F2937]
      bg-[#111827]
      p-5
      shadow-lg
    "
    >
      <h2
        className="
        mb-4
        text-xl
        font-semibold
        text-white
      "
      >
        {title}
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {data.map(
              (_: any, index: number) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index %
                        COLORS.length
                    ]
                  }
                />
              )
            )}
          </Pie>

          <Tooltip
            contentStyle={{
              background:
                "#111827",
              border:
                "1px solid #1F2937",
              borderRadius:
                "12px",
              color: "#fff",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}