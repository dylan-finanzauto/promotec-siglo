import { create } from "zustand"
import { Master } from "../types/Master"

type MasterStore = {
    sizeDamages: Master[],
    updateSizeDamages: (sizeDamages: Master[]) => void
}

export const useStore = create<MasterStore>()((set) => ({
    sizeDamages: [],
    updateSizeDamages: (sizeDamages) => set({ sizeDamages })
}))