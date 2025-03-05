import { createRoute, redirect } from "@tanstack/react-router";
import rootRoute from "./__root";
import ReportsContainer from "../pages/reports/ReportsContainer";
import { Role } from "../types/Auth";

const roles = ["SGL-Promotec"] as Role[]

const reportsRoute = createRoute({
    path: '/reports',
    getParentRoute: () => rootRoute,
    beforeLoad: ({ context }) => {
        if (!context.auth.token.isAuthenticated || !roles.includes(context.auth.token.role)) {
            throw redirect({
                to: '/',
            })
        }
    },
    component: () => <ReportsContainer />
})

export default reportsRoute;
