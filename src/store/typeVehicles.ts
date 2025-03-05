import { create } from "zustand"
import { Master } from "../types/Master"

type MasterStore = {
    typeVehicles: Master[],
    updateTypeVehicles: (typeVehicles: Master[]) => void
}

export const useStore = create<MasterStore>()((set) => ({
    typeVehicles: [],
    updateTypeVehicles: (typeVehicles) => set({ typeVehicles })
}))