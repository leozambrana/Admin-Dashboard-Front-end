"use client";

import {
  Users,
  DollarSign,
  TrendingUp,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader, ErrorState } from "@/components/common";
import { RevenueChart } from "@/components/charts";
import { useDashboardStats } from "@/hooks";
import { StatsCard } from "./_components";

export default function DashboardPage() {
  const { data: stats, isLoading, isError, refetch } = useDashboardStats();

  if (isError) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <PageHeader
        title="Dashboard Overview"
        description="Analise o desempenho da sua plataforma em tempo real."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total de Usuários"
          value={stats?.totalUsers}
          icon={Users}
          trend={stats?.userGrowth}
          isLoading={isLoading}
        />
        <StatsCard
          title="Usuários Ativos"
          value={stats?.activeUsers}
          icon={Activity}
          isLoading={isLoading}
        />
        <StatsCard
          title="Receita Total"
          value={stats?.totalRevenue}
          icon={DollarSign}
          trend={stats?.revenueGrowth}
          isCurrency
          isLoading={isLoading}
        />
        <StatsCard
          title="Projetos Ativos"
          value={stats?.activeProjects}
          icon={TrendingUp}
          isLoading={isLoading}
        />
      </div>

      <Card className="border border-white/10 bg-card/60 backdrop-blur-sm overflow-hidden shadow-2xl">
        <CardHeader className="border-b border-white/5 bg-white/5">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-xl font-bold">Métricas de Crescimento</CardTitle>
            <CardDescription className="text-sm">
              Acompanhe a evolução de novos usuários e receita recorrente nos últimos 7 dias.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {isLoading ? (
            <div className="space-y-4">
               <div className="flex gap-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-24" />
               </div>
               <Skeleton className="h-87.5 w-full rounded-2xl" />
            </div>
          ) : stats?.chartData ? (
            <div className="pt-4">
              <RevenueChart data={stats.chartData} />
            </div>
          ) : (
            <div className="flex h-87.5 items-center justify-center rounded-2xl border-2 border-dashed border-white/5 bg-white/5 text-muted-foreground">
              <p className="font-medium">Nenhum dado analítico disponível no momento.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
