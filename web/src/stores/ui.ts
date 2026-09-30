import { create } from 'zustand'

type UIState = {
  visible: boolean
  setVisible: (visible: boolean) => void
  toggle: () => void
}

export const useUIStore = create<UIState>((set) => ({
  visible: true,
  setVisible: (visible) => set({ visible }),
  toggle: () => set((state) => ({ visible: !state.visible })),
}))
