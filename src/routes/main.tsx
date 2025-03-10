import { createRouter } from "@tanstack/react-router";
import rootRoute from "./__root";
import authRoute from "./auth";
import ticketsRoute from "./tickets";
import optionsRoute from "./options";
import memosRoute from "./memos";
import reportsRoute from "./reports";
import usersRoute from "./users";
import rolesRoute from "./roles";
import handlerRoute from "./handler";
import { AuthContextType } from "../context/AuthContext";
import detailRoute from "./detail";
import historyRoute from "./history";

export const routeTree = rootRoute.addChildren([authRoute, ticketsRoute, optionsRoute, memosRoute, reportsRoute, usersRoute, rolesRoute, handlerRoute, detailRoute, historyRoute])

export const router = createRouter({
    routeTree, context: {
        auth: {} as AuthContextType
    }
})
