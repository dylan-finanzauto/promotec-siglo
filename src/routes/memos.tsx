import { createRoute, redirect } from "@tanstack/react-router";
import rootRoute from "./__root";
import MemosContainer from "../pages/memos/MemosContainer";
import { Role } from "../types/Auth";

const roles = ["SGL-Promotec"] as Role[]

const memosRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/memos',
    beforeLoad: ({ context }) => {
        console.log("token memos: ", context.auth.token)
        if (!context.auth.token.isAuthenticated || !roles.includes(context.auth.token.role)) {
            console.log("Entró a redirect memos")
            throw redirect({
                to: '/',
            })
        }
    },
    component: () => <MemosContainer />
})

export default memosRoute;