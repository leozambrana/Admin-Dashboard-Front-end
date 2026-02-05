"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Github, Mail, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLogin } from "@/hooks";
import { useAppStore } from "@/stores";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAppStore();
  const { mutate: login, isPending, isError, error } = useLogin();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login(formData, {
      onSuccess: (data) => {
        setUser(data.user);
        router.push("/dashboard");
      },
    });
  };

  return (
    <Card className="border border-white/20 bg-background/60 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]">
      <CardHeader className="space-y-2 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/30 ring-4 ring-primary/10">
          <span className="text-2xl font-black tracking-tighter text-primary-foreground">AD</span>
        </div>
        <CardTitle className="text-3xl font-bold tracking-tight bg-linear-to-br from-foreground to-foreground/70 bg-clip-text">
          Bem-vindo
        </CardTitle>
        <CardDescription className="text-base">
          Acesse sua conta para gerenciar seu dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold ml-1">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                className="pl-10 h-11 bg-background/50 border-white/10 focus:border-primary/50 transition-all"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" title="Password" className="text-sm font-semibold ml-1">Senha</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="h-11 bg-background/50 border-white/10 focus:border-primary/50 transition-all pr-10"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                required
                autoComplete="current-password"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Button variant="link" size="sm" className="px-0 font-medium text-xs text-primary/80 hover:text-primary">
              Esqueceu sua senha?
            </Button>
          </div>

          {isError && (
            <div className="rounded-xl bg-destructive/15 px-4 py-3 text-sm text-destructive border border-destructive/20 animate-in fade-in slide-in-from-top-1">
              <p className="font-medium">{error?.message || "Erro ao fazer login"}</p>
            </div>
          )}

          <Button type="submit" className="w-full h-11 text-base font-semibold shadow-lg shadow-primary/20 transition-all hover:-translate-y-px active:translate-y-0" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Validando...
              </>
            ) : (
              "Entrar no Painel"
            )}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-transparent px-2 text-muted-foreground font-medium">Ou continue com</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-11 bg-white/5 border-white/10 hover:bg-white/10 transition-all">
            <Chrome className="mr-2 h-4 w-4" />
            Google
          </Button>
          <Button variant="outline" className="h-11 bg-white/5 border-white/10 hover:bg-white/10 transition-all">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>

        <div className="rounded-2xl bg-primary/5 border border-primary/10 p-4 space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-primary/60">Acesso Demonstração</p>
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Email: <span className="text-foreground font-medium">admin@example.com</span></span>
            <span className="text-muted-foreground">Senha: <span className="text-foreground font-medium">admin123</span></span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
