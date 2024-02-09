import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface userProps{
    userId?: string,
    username?: string,
    accessToken?: string,
    refreshToken?: string
}

interface userStore extends userProps {
    logoutUser : () => void,
    updateUser : (props: userProps) => void
}

export const useUser = create(
    persist<userStore>(
        (set) => ({
          userId: '',
          username: '',
          accessToken: '',
          refreshToken: '',
          updateUser: (props: userProps) => set((state)=>({...state, ...props})),
          logoutUser: () => set(()=>({userId: '', username: '', accessToken: '', refreshToken: ''}))
        }),
        {
            name: 'user-store',
            storage: createJSONStorage(()=> sessionStorage)
        }
    )
)