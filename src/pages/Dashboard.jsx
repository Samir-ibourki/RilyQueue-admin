import React from "react";
import {
  FileText,
  CircleDollarSign,
  AlertTriangle,
  Trophy,
  UserPlus,
  UserCheck,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { lineData, pieData } from "../mocks/dashboardData";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Dashboard Overview</h1>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Card 1 */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg p-5 shadow-sm flex flex-col justify-between">
          <span className="text-[13px] text-slate-500 dark:text-slate-400 font-medium mb-3 tracking-wide">
            Missions Created Today
          </span>
          <div className="flex items-center gap-2 text-blue-500 dark:text-blue-400">
            <FileText strokeWidth={2} className="w-5 h-5" />
            <span className="text-[26px] font-medium tracking-tight text-slate-800 dark:text-slate-100">30</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg p-5 shadow-sm flex flex-col justify-between">
          <span className="text-[13px] text-slate-500 dark:text-slate-400 font-medium mb-3 tracking-wide">
            Missions Paid
          </span>
          <div className="flex items-center gap-2 text-green-500">
            <CircleDollarSign strokeWidth={2} className="w-5 h-5" />
            <span className="text-[26px] font-medium tracking-tight text-slate-800 dark:text-slate-100">
              $ 142
            </span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg p-5 shadow-sm flex flex-col justify-between">
          <span className="text-[13px] text-slate-500 dark:text-slate-400 font-medium mb-3 tracking-wide">
            Open Litiges
          </span>
          <div className="flex items-center gap-2 text-red-500">
            <AlertTriangle strokeWidth={2} className="w-5 h-5" />
            <span className="text-[26px] font-medium tracking-tight text-slate-800 dark:text-slate-100">8</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg p-5 shadow-sm flex flex-col justify-between">
          <span className="text-[13px] text-slate-500 dark:text-slate-400 font-medium mb-3 tracking-wide">
            Average Trust Score
          </span>
          <div className="flex items-center gap-2 text-amber-500">
            <Trophy strokeWidth={2} className="w-5 h-5" />
            <span className="text-[26px] font-medium tracking-tight text-slate-800 dark:text-slate-100">
              Silver
            </span>
          </div>
        </div>

        {/* Card 5 */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg p-5 shadow-sm flex flex-col justify-between">
          <span className="text-[13px] text-slate-500 dark:text-slate-400 font-medium mb-3 tracking-wide">
            Pending Agents
          </span>
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500">
            <UserPlus strokeWidth={2} className="w-5 h-5" />
            <span className="text-[26px] font-medium tracking-tight text-slate-800 dark:text-slate-100">
              12
            </span>
          </div>
        </div>

        {/* Card 6 */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg p-5 shadow-sm flex flex-col justify-between">
          <span className="text-[13px] text-slate-500 dark:text-slate-400 font-medium mb-3 tracking-wide">
            Active Agents
          </span>
          <div className="flex items-center gap-2 text-green-500">
            <UserCheck strokeWidth={2} className="w-5 h-5" />
            <span className="text-[26px] font-medium tracking-tight text-slate-800 dark:text-slate-100">87</span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Line Chart */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg shadow-sm lg:col-span-2 flex flex-col">
          <div className="p-4 border-b border-slate-100 dark:border-slate-700/50">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100">
              Missions Per Day (Last 7 Days)
            </h2>
          </div>
          <div className="p-5 flex-1 min-h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={lineData}
                margin={{ top: 10, right: 30, bottom: 20, left: -20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                  tickCount={5}
                  dx={-10}
                  domain={[0, "auto"]}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  labelStyle={{
                    color: "#64748b",
                    marginBottom: "4px",
                    fontSize: 12,
                  }}
                  itemStyle={{ fontSize: 13, fontWeight: 500 }}
                />
                <Legend
                  verticalAlign="bottom"
                  wrapperStyle={{ bottom: -5 }}
                  iconSize={8}
                  iconType="circle"
                  formatter={() => (
                    <span style={{ color: "#3b82f6", fontSize: 13 }}>
                      missions
                    </span>
                  )}
                />
                <Line
                  type="monotone"
                  name="missions"
                  dataKey="missions"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#3b82f6", strokeWidth: 0 }}
                  activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg shadow-sm flex flex-col">
          <div className="p-4 border-b border-slate-100 dark:border-slate-700/50">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100">
              Mission Categories
            </h2>
          </div>
          <div className="p-5 flex-1 min-h-[340px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  dataKey="value"
                  labelLine={false}
                  label={({
                    cx,
                    cy,
                    midAngle,
                    outerRadius,
                    index,
                    name,
                    value,
                  }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = outerRadius * 1.35;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                    return (
                      <text
                        x={x}
                        y={y}
                        fill={pieData[index].color}
                        textAnchor={x > cx ? "start" : "end"}
                        dominantBaseline="central"
                        fontSize={11}
                        fontWeight={500}
                      >
                        {`${name}: ${value}%`}
                      </text>
                    );
                  }}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
