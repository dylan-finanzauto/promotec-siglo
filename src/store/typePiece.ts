import { create } from "zustand"
import { Master } from "../types/Master"

type MasterStore = {
    typePieces: Master[],
    updateTypePieces: (typePieces: Master[]) => void
}

export const useStore = create<MasterStore>()((set) => ({
    typePieces: [],
    updateTypePieces: (typePieces) => set({ typePieces })
}))