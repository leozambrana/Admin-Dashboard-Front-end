"use client";

import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, cn } from "@/utils";
import type { Plan } from "@/types";

interface PlanCardProps {
  plan: Plan;
}

export function PlanCard({ plan }: PlanCardProps) {
  return (
    <Card
      className={cn(
        "relative flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        plan.isPopular &&
          "border-primary shadow-lg shadow-primary/10 ring-1 ring-primary/20"
      )}
    >
      {plan.isPopular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gap-1 px-3 py-1 shadow-md">
          <Sparkles className="h-3 w-3" />
          Popular
        </Badge>
      )}
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {plan.name}
          <Badge
            variant="outline"
            className={cn(
              "font-bold uppercase tracking-wider text-[10px]",
              plan.slug === "free" && "border-emerald-500/50 text-emerald-500 bg-emerald-500/5",
              plan.slug === "pro" && "border-blue-500/50 text-blue-500 bg-blue-500/5",
              plan.slug === "enterprise" && "border-purple-500/50 text-purple-500 bg-purple-500/5"
            )}
          >
            {plan.slug}
          </Badge>
        </CardTitle>
        <CardDescription className="flex items-baseline gap-1 py-2">
          <span className="text-4xl font-black tracking-tight text-foreground">
            {plan.price === 0 ? "Grátis" : formatCurrency(plan.price)}
          </span>
          {plan.price > 0 && (
            <span className="text-sm font-medium text-muted-foreground">/mês</span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex items-center gap-2 mb-6 p-2 rounded-lg bg-muted/30 border border-white/5">
           <div className="h-2 w-2 rounded-full bg-primary/40 animate-pulse" />
           <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            {plan.maxUsers === -1
              ? "Usuários ilimitados"
              : `Até ${plan.maxUsers} usuários`}
          </p>
        </div>
        <ul className="space-y-3">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-sm leading-relaxed"
            >
              <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                <Check className="h-3 w-3 text-emerald-500" strokeWidth={3} />
              </div>
              <span className="text-muted-foreground/90">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-6">
        <Button
          className={cn(
            "w-full h-11 font-bold transition-all shadow-sm active:scale-95",
            plan.isPopular ? "shadow-primary/20" : "hover:bg-muted"
          )}
          variant={plan.isPopular ? "default" : "outline"}
        >
          {plan.slug === "free"
            ? "Começar Grátis"
            : plan.slug === "pro"
              ? "Assinar Pro"
              : "Contatar Vendas"}
        </Button>
      </CardFooter>
    </Card>
  );
}
