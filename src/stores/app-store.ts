import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { User } from "@/types";

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  theme: "light" | "dark" | "system";
  _hasHydrated: boolean;

  setUser: (user: User | null) => void;
  logout: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebarCollapse: () => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
  setHasHydrated: (state: boolean) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        sidebarOpen: true,
        sidebarCollapsed: false,
        theme: "system",
        _hasHydrated: false,

        setUser: (user) =>
          set(
            {
              user,
              isAuthenticated: !!user,
            },
            false,
            "setUser"
          ),

        logout: () =>
          set(
            {
              user: null,
              isAuthenticated: false,
            },
            false,
            "logout"
          ),

        toggleSidebar: () =>
          set(
            (state) => ({ sidebarOpen: !state.sidebarOpen }),
            false,
            "toggleSidebar"
          ),

        setSidebarOpen: (open) =>
          set({ sidebarOpen: open }, false, "setSidebarOpen"),

        toggleSidebarCollapse: () =>
          set(
            (state) => ({ sidebarCollapsed: !state.sidebarCollapsed }),
            false,
            "toggleSidebarCollapse"
          ),

        setTheme: (theme) => set({ theme }, false, "setTheme"),

        setHasHydrated: (state) => set({ _hasHydrated: state }, false, "setHasHydrated"),
      }),
      {
        name: "admin-dash-storage",
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true);
          
          if (state?.theme) {
            const isDark = 
              state.theme === "dark" || 
              (state.theme === "system" && 
               typeof window !== "undefined" && 
               window.matchMedia("(prefers-color-scheme: dark)").matches);
            
            if (isDark) {
              document.documentElement.classList.add("dark");
            } else {
              document.documentElement.classList.remove("dark");
            }
          }
        },
        partialize: (state) => ({
          theme: state.theme,
          sidebarCollapsed: state.sidebarCollapsed,
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    { name: "AppStore" }
  )
);
