import type {
  User,
  Plan,
  DashboardStats,
  Project,
  LoginCredentials,
  AuthResponse,
  PaginatedResponse,
  UsersFilters,
  CreateUserDTO,
  UpdateUserDTO,
} from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333/api";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export function setToken(token: string): void {
  localStorage.setItem("token", token);
}

export function removeToken(): void {
  localStorage.removeItem("token");
}

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token = getToken();
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options?.headers,
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers,
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || "Erro na requisição");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await fetchApi<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    if (response.token) {
      setToken(response.token);
    }
    return response;
  },

  logout: () => {
    removeToken();
    return Promise.resolve({ message: "Logout realizado" });
  },

  me: () => fetchApi<{ user: User }>("/auth/me"),
};

export const usersApi = {
  list: (filters?: UsersFilters) => {
    const params = new URLSearchParams();
    if (filters?.search) params.set("search", filters.search);
    if (filters?.status && filters.status !== "all") {
      const statusMap: Record<string, string> = {
        active: "ACTIVE",
        inactive: "INACTIVE",
      };
      params.set("status", statusMap[filters.status] || filters.status);
    }
    if (filters?.page) params.set("page", String(filters.page));
    if (filters?.limit) params.set("limit", String(filters.limit));

    const query = params.toString();
    return fetchApi<PaginatedResponse<User>>(
      `/users${query ? `?${query}` : ""}`
    );
  },

  get: (id: string) => fetchApi<User>(`/users/${id}`),

  create: (data: CreateUserDTO) =>
    fetchApi<User>("/users", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: UpdateUserDTO) =>
    fetchApi<User>(`/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    fetchApi<void>(`/users/${id}`, {
      method: "DELETE",
    }),
};

export const plansApi = {
  list: () => fetchApi<Plan[]>("/plans"),
  get: (id: string) => fetchApi<Plan>(`/plans/${id}`),
};

export const dashboardApi = {
  stats: () => fetchApi<DashboardStats>("/dashboard/stats"),
};

export const projectsApi = {
  list: () => fetchApi<Project[]>("/projects"),

  get: (id: string) => fetchApi<Project>(`/projects/${id}`),

  update: (id: string, data: Partial<Project>) =>
    fetchApi<Project>(`/projects/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
};
