"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar, Header } from "@/components/layout";
import { useAppStore } from "@/stores";
import { useCurrentUser } from "@/hooks";
import { cn } from "@/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { sidebarCollapsed, isAuthenticated, setUser, _hasHydrated } = useAppStore();
  const { data: meData, isError, isLoading } = useCurrentUser();

  useEffect(() => {
    // Só redireciona se a hidratação terminou E realmente não está autenticado
    if (_hasHydrated && !isAuthenticated) {
      router.push("/login");
    }
  }, [_hasHydrated, isAuthenticated, router]);

  useEffect(() => {
    // Se temos dados do usuário da API, atualizamos o store
    if (meData?.user) {
      setUser(meData.user);
    }
  }, [meData, setUser]);

  useEffect(() => {
    // Se der erro ao buscar o usuário (token inválido/expirado), redireciona
    if (isError) {
      router.push("/login");
    }
  }, [isError, router]);

  // Enquanto o storage não hidratou ou está validando o usuário inicial
  if (!_hasHydrated || (isAuthenticated && isLoading)) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm font-medium animate-pulse">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Evita flash de conteúdo protegido antes do redirect
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <Header />
      <main
        className={cn(
          "min-h-screen pt-16 transition-all duration-300",
          sidebarCollapsed ? "pl-18" : "pl-64"
        )}
      >
        <div className="container mx-auto p-6">{children}</div>
      </main>
    </div>
  );
}
