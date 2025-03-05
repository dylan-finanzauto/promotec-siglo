import { create } from "zustand"
import { Master } from "../types/Master"

type MasterStore = {
    emails: Master[],
    updateEmails: (emails: Master[]) => void
}

export const useStore = create<MasterStore>()((set) => ({
    emails: [],
    updateEmails: (emails) => set({ emails })
}))