"use client";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import type { ChartDataPoint } from "@/types";
import { formatCurrency } from "@/utils";

interface RevenueChartProps {
  data: ChartDataPoint[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--border)"
          vertical={false}
        />
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
          dy={10}
        />
        <YAxis
          yAxisId="left"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
          dx={-10}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
          tickFormatter={(value) => `R$${(value / 1000).toFixed(1)}k`}
          dx={10}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ stroke: "var(--muted-foreground)", strokeOpacity: 0.3 }}
        />
        <Legend
          verticalAlign="top"
          height={36}
          formatter={(value) => (
            <span style={{ color: "var(--foreground)", fontSize: 14 }}>
              {value === "users" ? "Usuários" : "Receita"}
            </span>
          )}
        />
        <Area
          yAxisId="left"
          type="monotone"
          dataKey="users"
          name="users"
          stroke="var(--chart-1)"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorUsers)"
          dot={false}
          activeDot={{ r: 6, strokeWidth: 2, fill: "var(--background)" }}
        />
        <Area
          yAxisId="right"
          type="monotone"
          dataKey="revenue"
          name="revenue"
          stroke="var(--chart-2)"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorRevenue)"
          dot={false}
          activeDot={{ r: 6, strokeWidth: 2, fill: "var(--background)" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    color: string;
  }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border bg-background p-3 shadow-lg">
      <p className="mb-2 font-medium">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground">
            {entry.dataKey === "users" ? "Usuários:" : "Receita:"}
          </span>
          <span className="font-medium">
            {entry.dataKey === "users"
              ? entry.value.toLocaleString("pt-BR")
              : formatCurrency(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}
