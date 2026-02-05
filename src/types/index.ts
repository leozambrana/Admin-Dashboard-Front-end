export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: UserRole;
  status: UserStatus;
  planId: string;
  createdAt: string;
  updatedAt?: string;
}

export type UserRole = "ADMIN" | "USER" | "EDITOR";
export type UserStatus = "ACTIVE" | "INACTIVE";

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  planId: string;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  role?: UserRole;
  status?: UserStatus;
  planId?: string;
}

export interface Plan {
  id: string;
  name: string;
  slug: PlanSlug;
  price: number;
  features: string[];
  maxUsers: number;
  isPopular?: boolean;
}

export type PlanSlug = "free" | "pro" | "enterprise";

export interface DashboardStats {
  totalUsers: number;
  totalRevenue: number;
  activeProjects: number;
  pendingTasks: number;
  revenueGrowth: number;
  userGrowth: number;
  activeUsers: number;
  chartData: ChartDataPoint[];
}

export interface ChartDataPoint {
  date: string;
  users: number;
  revenue: number;
}

export interface Project {
  id: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
  progress: number;
  dueDate: string | null;
  teamSize: number;
  createdAt?: string;
  updatedAt?: string;
}

export type ProjectStatus = "ACTIVE" | "COMPLETED" | "ON_HOLD" | "CANCELLED";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  error: string;
}

export interface UsersFilters {
  search?: string;
  status?: "active" | "inactive" | "all";
  page?: number;
  limit?: number;
}
