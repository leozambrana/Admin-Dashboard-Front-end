"use client";

import { PageHeader, ErrorState } from "@/components/common";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { usePlans } from "@/hooks";
import { PlanCard } from "./_components";

export default function PlansPage() {
  const { data: plans, isLoading, isError, refetch } = usePlans();

  if (isError) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <PageHeader
        title="Planos e Preços"
        description="Escolha o plano ideal para escalar o seu negócio com produtividade e controle."
      />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="relative overflow-hidden">
                <CardHeader className="space-y-4">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-10 w-40" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/6" />
                  </div>
                </CardContent>
                <CardFooter className="pt-6">
                  <Skeleton className="h-11 w-full" />
                </CardFooter>
              </Card>
            ))
          : plans?.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
      </div>

      <div className="mt-12 rounded-3xl border border-white/10 bg-linear-to-br from-primary/5 to-transparent p-8 text-center backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-2">Precisa de algo customizado?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Oferecemos soluções personalizadas para grandes empresas com necessidades específicas de segurança, suporte e volume de dados.
        </p>
        <button className="text-primary font-bold hover:underline transition-all">
          Converse com nossos especialistas →
        </button>
      </div>
    </div>
  );
}
