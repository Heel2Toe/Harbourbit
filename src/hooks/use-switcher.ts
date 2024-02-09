import { create } from "zustand"

interface SwitcherProps{
    mode: 'journal' | 'calendar',
    setMode: (newMode: 'journal' | 'calendar') => void
}


export const useSwitcher = create<SwitcherProps>((set)=>({
 mode: 'journal',
 setMode: (newMode) => set({mode: newMode})
}))