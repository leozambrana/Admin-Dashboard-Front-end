"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader, EmptyState, ErrorState } from "@/components/common";
import { CreateUserDialog, EditUserDialog, DeleteUserDialog, UserListItem } from "./_components";
import { useUsers, usePlans } from "@/hooks";
import type { UsersFilters, User } from "@/types";

export default function UsersPage() {
  const [filters, setFilters] = useState<UsersFilters>({
    page: 1,
    limit: 10,
    status: "all",
    search: "",
  });

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  const { data, isLoading, isError, refetch } = useUsers(filters);
  const { data: plans } = usePlans();

  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value, page: 1 }));
  };

  const handleStatusChange = (status: "active" | "inactive" | "all") => {
    setFilters((prev) => ({ ...prev, status, page: 1 }));
  };

  if (isError) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Usuários"
        description="Gerencie os usuários do sistema, altere permissões e visualize planos."
      >
        <Button onClick={() => setIsCreateDialogOpen(true)} className="shadow-lg shadow-primary/20">
          <Plus className="mr-2 h-4 w-4" />
          Novo Usuário
        </Button>
      </PageHeader>

      <Card className="border border-white/10 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-xl font-bold">Gestão de Usuários</CardTitle>
              <CardDescription>
                {data?.meta.total || 0} usuários registrados no total
              </CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou email..."
                  className="w-full sm:w-64 pl-9 bg-background/50 border-white/10 focus:border-primary/50"
                  value={filters.search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
              <div className="flex bg-muted/50 p-1 rounded-lg border border-white/5">
                {(["all", "active", "inactive"] as const).map((status) => (
                  <Button
                    key={status}
                    variant={filters.status === status ? "secondary" : "ghost"}
                    size="sm"
                    className={filters.status === status ? "shadow-sm" : ""}
                    onClick={() => handleStatusChange(status)}
                  >
                    {status === "all"
                      ? "Todos"
                      : status === "active"
                        ? "Ativos"
                        : "Inativos"}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 rounded-lg border border-white/5 p-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
              ))}
            </div>
          ) : data?.data.length === 0 ? (
            <EmptyState
              title="Nenhum usuário encontrado"
              description="Não encontramos nenhum usuário com os filtros aplicados."
              action={{
                label: "Criar Novo Usuário",
                onClick: () => setIsCreateDialogOpen(true),
              }}
            />
          ) : (
            <div className="space-y-3">
              {data?.data.map((user) => (
                <UserListItem 
                  key={user.id} 
                  user={user} 
                  plans={plans}
                  onEdit={setEditingUser}
                  onDelete={setDeletingUser}
                />
              ))}
            </div>
          )}

          {data && data.meta.totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
              <p className="text-sm text-muted-foreground">
                Página <span className="font-medium text-foreground">{data.meta.page}</span> de <span className="font-medium text-foreground">{data.meta.totalPages}</span>
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-background/50 border-white/10"
                  disabled={data.meta.page === 1}
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, page: prev.page! - 1 }))
                  }
                >
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-background/50 border-white/10"
                  disabled={data.meta.page === data.meta.totalPages}
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, page: prev.page! + 1 }))
                  }
                >
                  Próximo
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modais Refatorados */}
      <CreateUserDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen} 
      />
      
      <EditUserDialog 
        key={editingUser?.id}
        user={data?.data.find((u: User) => u.id === editingUser?.id) || editingUser} 
        onClose={() => setEditingUser(null)} 
      />
      
      <DeleteUserDialog 
        user={deletingUser} 
        onClose={() => setDeletingUser(null)} 
      />
    </div>
  );
}
