import { createRoute, redirect } from "@tanstack/react-router";
import rootRoute from "./__root";
import UsersContainer from "../pages/users/UsersContainer";
import { Role } from "../types/Auth";

const roles = ["SGL-Tecnologia"] as Role[]

const usersRoute = createRoute({
    path: '/users',
    getParentRoute: () => rootRoute,
    beforeLoad: ({ context }) => {
        if (!context.auth.token.isAuthenticated || !roles.includes(context.auth.token.role)) {
            throw redirect({
                to: '/',
            })
        }
    },
    component: () => <UsersContainer />
})

export default usersRoute;