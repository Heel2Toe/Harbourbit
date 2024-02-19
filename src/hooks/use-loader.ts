import { create } from "zustand";

interface loaderProps{
    spinner? : boolean,
    loadingPage?: boolean
}

interface loaderFuncProps extends loaderProps{
    setLoading: (props: loaderProps) => void,

}


export const useLoading = create<loaderFuncProps>((set)=>({
    spinner: false,
    loadingPage: false,
    setLoading: (props: loaderProps) => set((prev)=>({...prev, ...props}))
}))