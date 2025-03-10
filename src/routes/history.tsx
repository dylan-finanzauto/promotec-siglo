import { createRoute, redirect } from "@tanstack/react-router";
import rootRoute from "./__root";
import { Role } from "../types/Auth";
import HistoryContainer from "../pages/history/HistoryContainer";

const roles = ["SGL-Tecnologia"] as Role[]

const historyRoute = createRoute({
    path: '/history/$id',
    getParentRoute: () => rootRoute,
    beforeLoad: ({ context }) => {
        if (!context.auth.token.isAuthenticated || !roles.includes(context.auth.token.role)) {
            throw redirect({
                to: '/',
            })
        }
    },
    component: () => <HistoryContainer />
})

export default historyRoute;