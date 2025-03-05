import { create } from "zustand"
import { Master } from "../types/Master"

type MasterStore = {
    concessioners: Master[],
    updateConcessioners: (concessioners: Master[]) => void
}

export const useStore = create<MasterStore>()((set) => ({
    concessioners: [],
    updateConcessioners: (concessioners) => set({ concessioners })
}))