import { create } from "zustand";

interface ManageUIState {
  collapsed: boolean;
  toggle: () => void;
  setCollapsed: (v: boolean) => void;
}

// Sidebar collapse state for the partner/developer console. Module-level, so it
// persists across client navigations; default false → no hydration mismatch.
export const useManageUI = create<ManageUIState>((set) => ({
  collapsed: false,
  toggle: () => set((s) => ({ collapsed: !s.collapsed })),
  setCollapsed: (v) => set({ collapsed: v }),
}));
