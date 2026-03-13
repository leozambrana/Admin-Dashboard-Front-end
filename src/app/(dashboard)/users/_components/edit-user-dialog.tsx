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
import { useUpdateUser, usePlans, useUpdateUserAvatar } from "@/hooks";
import type { User, UserRole, UserStatus, Plan } from "@/types";
import { Camera } from "lucide-react";
import Image from "next/image";
import { getImageUrl } from "@/services/api";

interface EditUserDialogProps {
  user: User | null;
  onClose: () => void;
}

export function EditUserDialog({ user, onClose }: EditUserDialogProps) {
  const { data: plans } = usePlans();
  const updateUser = useUpdateUser();
  const updateAvatar = useUpdateUserAvatar();

  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    role: (user?.role ?? "USER") as UserRole,
    status: (user?.status ?? "ACTIVE") as UserStatus,
    planId: user?.planId ?? "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await updateUser.mutateAsync({
        id: user.id,
        data: form,
      });
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("avatar", file);

      try {
        await updateAvatar.mutateAsync({
          userId: user?.id || "",
          file,
        });
      } catch (error) {

        console.error("Erro ao fazer upload do avatar:", error);
      }
    }
  };

  const avatarUrl = getImageUrl(user?.avatar);

  return (
    <Dialog open={!!user} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
          <DialogDescription>
            Faça alterações no perfil do usuário. Clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="flex flex-col items-center justify-center gap-4 py-4">
            <div className="relative group">
              <div className="h-24 w-24 rounded-full border-2 border-primary/20 overflow-hidden bg-muted flex items-center justify-center">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={user?.name || "Avatar"}
                    width={96}
                    height={96}
                    unoptimized
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold">{user?.name ? user.name.charAt(0) : ""}</span>
                )}
              </div>
              <label
                htmlFor="avatar-upload"
                className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Camera className="h-6 w-6" />
              </label>
              <input
                id="avatar-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
                disabled={updateAvatar.isPending}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {updateAvatar.isPending ? "Enviando..." : "Clique para alterar sua foto"}
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-name">Nome</Label>
            <Input
              id="edit-name"
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-email">Email</Label>
            <Input
              id="edit-email"
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-role">Função</Label>
            <Select
              value={form.role}
              onValueChange={(value: UserRole) =>
                setForm((prev) => ({ ...prev, role: value }))
              }
            >
              <SelectTrigger id="edit-role">
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
            <Label htmlFor="edit-status">Status</Label>
            <Select
              value={form.status}
              onValueChange={(value: UserStatus) =>
                setForm((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger id="edit-status">
                <SelectValue placeholder="Selecione um status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Ativo</SelectItem>
                <SelectItem value="INACTIVE">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-plan">Plano</Label>
            <Select
              value={form.planId}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, planId: value }))
              }
            >
              <SelectTrigger id="edit-plan">
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
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={updateUser.isPending}>
              {updateUser.isPending ? "Salvando..." : "Salvar alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
