import { create } from "zustand";

interface spinnerProps{
    spinnerLoading: boolean,
    setSpinner: (loading: boolean) => void
}


export const useSpinner = create<spinnerProps>((set)=>({
    spinnerLoading: false,
    setSpinner: (loading) => set({spinnerLoading: loading})
}))