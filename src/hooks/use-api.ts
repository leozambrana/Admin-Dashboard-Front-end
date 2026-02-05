import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi, usersApi, plansApi, dashboardApi, projectsApi } from "@/services/api";
import type { UsersFilters, CreateUserDTO, UpdateUserDTO, Project } from "@/types";

export const queryKeys = {
  currentUser: ["auth", "me"] as const,
  users: (filters?: UsersFilters) => ["users", filters] as const,
  user: (id: string) => ["users", id] as const,
  plans: ["plans"] as const,
  plan: (id: string) => ["plans", id] as const,
  dashboardStats: ["dashboard", "stats"] as const,
  projects: ["projects"] as const,
  project: (id: string) => ["projects", id] as const,
};

export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.currentUser,
    queryFn: authApi.me,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.currentUser, data);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.currentUser, null);
      queryClient.clear();
    },
  });
}

export function useUsers(filters?: UsersFilters) {
  return useQuery({
    queryKey: queryKeys.users(filters),
    queryFn: () => usersApi.list(filters),
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: queryKeys.user(id),
    queryFn: () => usersApi.get(id),
    enabled: !!id,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserDTO) => usersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserDTO }) =>
      usersApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.user(id) });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function usePlans() {
  return useQuery({
    queryKey: queryKeys.plans,
    queryFn: plansApi.list,
    staleTime: 1000 * 60 * 10,
  });
}

export function usePlan(id: string) {
  return useQuery({
    queryKey: queryKeys.plan(id),
    queryFn: () => plansApi.get(id),
    enabled: !!id,
  });
}

export function useDashboardStats() {
  return useQuery({
    queryKey: queryKeys.dashboardStats,
    queryFn: dashboardApi.stats,
  });
}

export function useProjects() {
  return useQuery({
    queryKey: queryKeys.projects,
    queryFn: projectsApi.list,
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: queryKeys.project(id),
    queryFn: () => projectsApi.get(id),
    enabled: !!id,
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Project> }) =>
      projectsApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects });
      queryClient.invalidateQueries({ queryKey: queryKeys.project(id) });
    },
  });
}
