import { create } from "zustand"
import { Master } from "../types/Master"

type MasterStore = {
    companies: Master[],
    updateCompanies: (companies: Master[]) => void
}

export const useStore = create<MasterStore>()((set) => ({
    companies: [],
    updateCompanies: (companies) => set({ companies })
}))