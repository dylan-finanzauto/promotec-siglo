import { create } from "zustand"
import { Master } from "../types/Master"

type MasterStore = {
    typologies: Master[],
    updateTypologies: (typologies: Master[]) => void
}

export const useStore = create<MasterStore>()((set) => ({
    typologies: [],
    updateTypologies: (typologies) => set({ typologies })
}))