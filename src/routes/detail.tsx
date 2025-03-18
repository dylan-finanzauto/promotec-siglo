import { createRoute, redirect } from "@tanstack/react-router";
import rootRoute from "./__root";
import { Role } from "../types/Auth";
import DetailContainer from "../pages/detail/DetailContainer";
import IdentifierProvider from "../providers/IdentifierProvider";

const roles = ["SGL-Promotec"] as Role[]

const detailRoute = createRoute({
    path: '/detail/$id',
    getParentRoute: () => rootRoute,
    beforeLoad: ({ context }) => {
        if (!context.auth.token.isAuthenticated || !roles.includes(context.auth.token.role)) {
            throw redirect({
                to: '/',
            })
        }
    },
    component: () => (
        <IdentifierProvider>
            <DetailContainer />
        </IdentifierProvider>
    )
})

export default detailRoute;
