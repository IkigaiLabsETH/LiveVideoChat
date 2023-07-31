import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
import { zustandStorage } from './engine'

export type ThemeType = 'dark' | 'light'

interface UIConfigState {
  darkmode: boolean
  setDarkMode: (val: boolean) => void
  resetState: () => void
}

export const useUIConfigStore = create<UIConfigState>()(
  devtools(
    persist(
      (set) => ({
        darkmode: false,
        setDarkMode: (val) => set(() => ({ darkmode: val })),
        // clear the entire store and actions states
        resetState: () => set({}, true),
      }),
      {
        name: 'ui-config',
        storage: createJSONStorage(() => zustandStorage),
      }
    )
  )
)