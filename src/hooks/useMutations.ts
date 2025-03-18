import { useMutation } from '@tanstack/react-query'
import { useStore as userStore } from '../store/user'
import { useStore as attriStore } from '../store/attributable'
import { useStore as comStore } from '../store/company'
import { useStore as concStore } from '../store/concessioner'
import { useStore as emailStore } from '../store/email'
import { useStore as sdStore } from '../store/sizeDamage'
import { useStore as tvStore } from '../store/typeVehicles'
import { useStore as tdStore } from '../store/typeDamage'
import { useStore as tpStore } from '../store/typePiece'
import { useStore as stateStore } from '../store/state'
import { useStore as typologyStore } from '../store/typology'
import { useStore as roleStore } from '../store/role'
import { attributable, company, concessioner, email, sizeDamage, state, typeDamage, typePiece, typeVehicle, typology } from '../services/master'
import { current } from '../services/user'
import { all } from '../services/role'

const useMutations = () => {
    const { updateUser } = userStore((state) => state)
    const { updateAttributables } = attriStore((state) => state)
    const { updateCompanies } = comStore((state) => state)
    const { updateConcessioners } = concStore((state) => state)
    const { updateEmails } = emailStore((state) => state)
    const { updateSizeDamages } = sdStore((state) => state)
    const { updateTypeVehicles } = tvStore((state) => state)
    const { updateTypeDamages } = tdStore((state) => state)
    const { updateTypePieces } = tpStore((state) => state)
    const { updateStates } = stateStore((state) => state)
    const { updateTypologies } = typologyStore((state) => state)
    const { updateRoles } = roleStore((state) => state)

    const userMutation = useMutation({
        mutationFn: (token: string) => current(token),
        onSuccess: (data) => updateUser(data),
    })

    const consMutation = useMutation({
        mutationFn: (token: string) => concessioner(token),
        onSuccess: (data) => updateConcessioners(data)
    })

    const tvMutation = useMutation({
        mutationFn: (token: string) => typeVehicle(token),
        onSuccess: (data) => updateTypeVehicles(data)
    })

    const comMutation = useMutation({
        mutationFn: (token: string) => company(token),
        onSuccess: (data) => updateCompanies(data)
    })

    const tdMutation = useMutation({
        mutationFn: (token: string) => typeDamage(token),
        onSuccess: (data) => updateTypeDamages(data)
    })

    const emailMutation = useMutation({
        mutationFn: (token: string) => email(token),
        onSuccess: (data) => updateEmails(data)
    })

    const sdMutation = useMutation({
        mutationFn: (token: string) => sizeDamage(token),
        onSuccess: (data) => updateSizeDamages(data)
    })

    const tpMutation = useMutation({
        mutationFn: (token: string) => typePiece(token),
        onSuccess: (data) => updateTypePieces(data)
    })

    const attriMutation = useMutation({
        mutationFn: (token: string) => attributable(token),
        onSuccess: (data) => updateAttributables(data)
    })

    const stateMutation = useMutation({
        mutationFn: (token: string) => state(token),
        onSuccess: (data) => updateStates(data)
    })

    const typologyMutation = useMutation({
        mutationFn: (token: string) => typology(token),
        onSuccess: (data) => updateTypologies(data)
    })

    const roleMutation = useMutation({
        mutationFn: (token: string) => all(token),
        onSuccess: (data) => updateRoles(data)
    })

    return { userMutation, consMutation, comMutation, emailMutation, sdMutation, tvMutation, tdMutation, tpMutation, attriMutation, stateMutation, typologyMutation, roleMutation }
}

export default useMutations
