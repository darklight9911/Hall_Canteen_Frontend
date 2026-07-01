import { create } from "zustand";

interface ManageUIState {
  collapsed: boolean;
  mobileOpen: boolean;
  toggle: () => void;
  setCollapsed: (v: boolean) => void;
  toggleMobile: () => void;
  setMobileOpen: (v: boolean) => void;
}

// Sidebar collapse + mobile drawer state for the partner/developer console.
// Module-level so it persists across client navigations; default false → no hydration mismatch.
export const useManageUI = create<ManageUIState>((set) => ({
  collapsed: false,
  mobileOpen: false,
  toggle: () => set((s) => ({ collapsed: !s.collapsed })),
  setCollapsed: (v) => set({ collapsed: v }),
  toggleMobile: () => set((s) => ({ mobileOpen: !s.mobileOpen })),
  setMobileOpen: (v) => set({ mobileOpen: v }),
}));
