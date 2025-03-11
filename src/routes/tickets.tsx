import { createRoute, redirect } from "@tanstack/react-router";
import rootRoute from "./__root";
import TicketsContainer from "../pages/tickets/TicketsContainer";
import { Role } from "../types/Auth";
import IdentifierProvider from "../providers/IdentifierProvider";

const roles = ["SGL-Promotec"] as Role[]

const ticketsRoute = createRoute({
    path: '/tickets',
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
            <TicketsContainer />
        </IdentifierProvider>
    )
})

export default ticketsRoute;