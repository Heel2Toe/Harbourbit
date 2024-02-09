import { create } from "zustand";

interface RelaodProps {
    reloadVariable: boolean,
    triggerReload: () => void
}

export const useReload = create<RelaodProps>((set)=>({
    reloadVariable: false,
    triggerReload: () => set((prev)=>({reloadVariable: !prev.reloadVariable}))
}))