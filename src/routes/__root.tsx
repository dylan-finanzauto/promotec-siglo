import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { AuthContextType } from "../context/AuthContext";

interface RouterContext {
    auth: AuthContextType
}

const rootRoute = createRootRouteWithContext<RouterContext>()({
    component: () => <Outlet />
})

export default rootRoute;