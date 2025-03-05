import { createRoute, redirect } from "@tanstack/react-router";
import rootRoute from "./__root";

const roleRoutes = {
    'SGL-Promotec': '/tickets',
    'SGL-Tecnologia': '/users',
    'SGL-Concesionario': '/tickets',
};

const handlerRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    beforeLoad: ({ context }) => {
        if (context.auth.token.isAuthenticated) {
            const redirectTo = roleRoutes[context.auth.token.role];
            throw redirect({ to: redirectTo })
        }
        throw redirect({ to: '/login' });
    },
    component: () => <div>Loading...</div>, // Puedes agregar un componente de carga si es necesario
});

export default handlerRoute;