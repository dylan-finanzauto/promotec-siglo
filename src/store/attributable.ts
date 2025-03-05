import { create } from "zustand"
import { Master } from "../types/Master"

type MasterStore = {
    attributables: Master[],
    updateAttributables: (attributables: Master[]) => void
}

export const useStore = create<MasterStore>()((set) => ({
    attributables: [],
    updateAttributables: (attributables) => set({ attributables })
}))