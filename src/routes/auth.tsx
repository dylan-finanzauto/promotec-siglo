import { createRoute, redirect } from "@tanstack/react-router";
import rootRoute from "./__root";
import ContainerAuth from "../pages/auth/AuthContainer";

const authRoute = createRoute({
    path: '/login',
    getParentRoute: () => rootRoute,
    beforeLoad: ({ context }) => {
        const { token } = context.auth;
        if (token.isAuthenticated) {
            throw redirect({
                to: "/"
            })
        }
    },
    component: () => <ContainerAuth />,
})

export default authRoute;