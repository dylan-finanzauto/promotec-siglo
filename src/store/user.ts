import { create } from 'zustand'
import { User } from '../types/User'

type UserStore = {
    user: User
    updateUser: (user: User) => void
}

export const useStore = create<UserStore>()((set) => ({
    user: {
        name: "",
        lastName: "",
        email: "",
        lastConnecction: "",
        roles: []
    },
    updateUser: (user) => set({ user }),
}))
