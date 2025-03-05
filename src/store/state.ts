import { create } from "zustand"
import { Master } from "../types/Master"

type MasterStore = {
    states: Master[],
    updateStates: (states: Master[]) => void
}

export const useStore = create<MasterStore>()((set) => ({
    states: [],
    updateStates: (states) => set({ states })
}))