import { createRoute, redirect } from "@tanstack/react-router";
import rootRoute from "./__root";
import OptionsContainer from "../pages/options/OptionsContainer";
import { Role } from "../types/Auth";

const roles = ["SGL-Promotec"] as Role[]

const optionsRoute = createRoute({
    path: '/options',
    getParentRoute: () => rootRoute,
    beforeLoad: ({ context }) => {
        if (!context.auth.token.isAuthenticated || !roles.includes(context.auth.token.role)) {
            throw redirect({
                to: '/',
            })
        }
    },
    component: () => <OptionsContainer />
})

export default optionsRoute;
