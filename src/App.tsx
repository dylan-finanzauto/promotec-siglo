import { RouterProvider } from '@tanstack/react-router'
import useAuth from './hooks/useAuth'
import { useEffect } from 'react'
import useMutations from './hooks/useMutations'
import { router } from './routes/main'

function App() {
    const auth = useAuth()
    const { userMutation, consMutation, comMutation, emailMutation, sdMutation, tvMutation, tdMutation, tpMutation, attriMutation, stateMutation, typologyMutation } = useMutations()

    useEffect(() => {
        const { token } = auth

        if (token.isAuthenticated) {
            const accessToken = token.accessToken
            userMutation.mutate(accessToken)
            consMutation.mutate(accessToken)
            comMutation.mutate(accessToken)
            emailMutation.mutate(accessToken)
            sdMutation.mutate(accessToken)
            tvMutation.mutate(accessToken)
            tdMutation.mutate(accessToken)
            tpMutation.mutate(accessToken)
            attriMutation.mutate(accessToken)
            stateMutation.mutate(accessToken)
            typologyMutation.mutate(accessToken)
        }
    }, [auth])

    return <RouterProvider basepath={import.meta.env.VITE_PUBLIC_URL} router={router} context={{ auth }} />
}

export default App
