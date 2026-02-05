"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatNumber, cn } from "@/utils";

interface StatsCardProps {
  title: string;
  value?: number;
  icon: React.ElementType;
  trend?: number;
  isCurrency?: boolean;
  isLoading?: boolean;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  isCurrency = false,
  isLoading = false,
}: StatsCardProps) {
  const isPositive = trend && trend > 0;

  return (
    <Card className="border border-white/10 bg-card/60 backdrop-blur-sm transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
          {title}
        </CardTitle>
        <div className="rounded-lg bg-primary/10 p-2 border border-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-24" />
        ) : (
          <div className="flex flex-col gap-1">
            <span className="text-3xl font-black tracking-tight text-foreground">
              {isCurrency
                ? formatCurrency(value || 0)
                : formatNumber(value || 0)}
            </span>
            {trend !== undefined && (
              <div
                className={cn(
                  "flex items-center gap-1 text-xs font-bold",
                  isPositive ? "text-emerald-500" : "text-rose-500"
                )}
              >
                <div className={cn(
                  "flex items-center gap-0.5 rounded-full px-1.5 py-0.5 border",
                  isPositive ? "bg-emerald-500/10 border-emerald-500/20" : "bg-rose-500/10 border-rose-500/20"
                )}>
                  {isPositive ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {Math.abs(trend).toFixed(1)}%
                </div>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">em relação a ontem</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
