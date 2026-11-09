import { create } from 'zustand'

type AdminUi = {
  navOpen: boolean
  dirty: boolean
  setNavOpen: (open: boolean) => void
  setDirty: (dirty: boolean) => void
}

export const useAdminUi = create<AdminUi>((set) => ({
  navOpen: false,
  dirty: false,
  setNavOpen: (navOpen) => set({ navOpen }),
  setDirty: (dirty) => set({ dirty }),
}))
