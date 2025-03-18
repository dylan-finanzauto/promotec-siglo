import { create } from "zustand"
import { RoleResponse } from "../types/Rest"

type RoleStore = {
    roles: RoleResponse[],
    updateRoles: (roles: RoleResponse[]) => void
}

export const useStore = create<RoleStore>()((set) => ({
    roles: [],
    updateRoles: (roles) => set({ roles })
}))