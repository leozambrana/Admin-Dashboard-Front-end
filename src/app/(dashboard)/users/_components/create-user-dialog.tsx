"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateUser, usePlans } from "@/hooks";
import type { UserRole, Plan } from "@/types";

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateUserDialog({ open, onOpenChange }: CreateUserDialogProps) {
  const { data: plans } = usePlans();
  const createUser = useCreateUser();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER" as UserRole,
    planId: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Garantir que temos um planId selecionado (fallback para o primeiro plano disponível)
    const payload = {
      ...form,
      planId: form.planId || plans?.[0]?.id || "",
    };

    try {
      await createUser.mutateAsync(payload);
      onOpenChange(false);
      setForm({
        name: "",
        email: "",
        password: "",
        role: "USER",
        planId: plans?.[0]?.id || "",
      });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  };

  const currentPlanId = form.planId || plans?.[0]?.id || "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Novo Usuário</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo para criar um novo usuário no sistema.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="create-name">Nome</Label>
            <Input
              id="create-name"
              placeholder="Nome completo"
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="create-email">Email</Label>
            <Input
              id="create-email"
              type="email"
              placeholder="email@exemplo.com"
              value={form.email}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="create-password">Senha</Label>
            <Input
              id="create-password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, password: e.target.value }))
              }
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="create-role">Função</Label>
            <Select
              value={form.role}
              onValueChange={(value: UserRole) =>
                setForm((prev) => ({ ...prev, role: value }))
              }
              required
            >
              <SelectTrigger id="create-role">
                <SelectValue placeholder="Selecione uma função" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMIN">Administrador</SelectItem>
                <SelectItem value="EDITOR">Editor</SelectItem>
                <SelectItem value="USER">Usuário</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="create-plan">Plano</Label>
            <Select
              value={currentPlanId}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, planId: value }))
              }
              required
            >
              <SelectTrigger id="create-plan">
                <SelectValue placeholder="Selecione um plano" />
              </SelectTrigger>
              <SelectContent>
                {plans?.map((plan: Plan) => (
                  <SelectItem key={plan.id} value={plan.id}>
                    {plan.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={createUser.isPending}>
              {createUser.isPending ? "Criando..." : "Criar Usuário"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
