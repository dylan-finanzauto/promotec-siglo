import { createRoute, redirect } from "@tanstack/react-router";
import rootRoute from "./__root";
import RolesContainer from "../pages/roles/RolesContainer";
import { Role } from "../types/Auth";

const roles = ["SGL-Tecnologia"] as Role[]

const rolesRoute = createRoute({
    path: '/roles',
    getParentRoute: () => rootRoute,
    beforeLoad: ({ context }) => {
        if (!context.auth.token.isAuthenticated || !roles.includes(context.auth.token.role)) {
            throw redirect({
                to: '/',
            })
        }
    },
    component: () => <RolesContainer />
})

export default rolesRoute;
