"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials, cn } from "@/utils";
import type { User, Plan } from "@/types";

interface UserListItemProps {
  user: User;
  plans: Plan[] | undefined;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UserListItem({ user, plans, onEdit, onDelete }: UserListItemProps) {
  const getPlanName = (planId: string) => {
    return plans?.find((p) => p.id === planId)?.name || "—";
  };

  return (
    <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/50">
      <Avatar className="h-10 w-10 border border-border">
        <AvatarImage src={user.avatar || undefined} alt={user.name} />
        <AvatarFallback className="bg-primary/10 text-primary font-medium">
          {getInitials(user.name)}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <p className="font-semibold truncate text-foreground">{user.name}</p>
        <p className="text-sm text-muted-foreground truncate">
          {user.email}
        </p>
      </div>

      <div className="hidden md:flex flex-col items-end gap-1 mr-4">
        <Badge variant="outline">
          {getPlanName(user.planId)}
        </Badge>
      </div>

      <div className="flex flex-col items-end gap-1 mr-4">
        <Badge
          className={cn(
            "font-medium",
            user.status === "ACTIVE"
              ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
              : "bg-rose-500/10 text-rose-500 border-rose-500/20"
          )}
          variant="secondary"
        >
          {user.status === "ACTIVE" ? "Ativo" : "Inativo"}
        </Badge>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-white/10"
          onClick={() => onEdit(user)}
          title="Editar Usuário"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={() => onDelete(user)}
          title="Excluir Usuário"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
