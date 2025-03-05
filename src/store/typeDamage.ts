import { create } from "zustand"
import { Master } from "../types/Master"

type MasterStore = {
    typeDamages: Master[],
    updateTypeDamages: (typeDamages: Master[]) => void
}

export const useStore = create<MasterStore>()((set) => ({
    typeDamages: [],
    updateTypeDamages: (typeDamages) => set({ typeDamages })
}))