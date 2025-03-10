import type React from "react";
import CardIcon from "../common/icons/CardIcon";
import LikeIcon from "../common/icons/LikeIcon";
import SheetIcon from "../common/icons/SheetIcon";
import ShieldIcon from "../common/icons/ShieldIcon";
import { Link } from "@tanstack/react-router";
import SideUser from "./SideUser";
import { useCallback, useState } from "react";
import SidebarSkeleton from "./SidebarSkeleton";
import { useStore } from "../../store/user";
import useAuth from "../../hooks/useAuth";
import UsersIcon from "../common/icons/UsersIcon";
import { Role } from "../../types/Auth";

export interface NavItemType {
    href: string;
    text: string;
    icon: React.ReactNode,
    roles: Role[]
}

const nav: NavItemType[] = [
    {
        href: "/tickets",
        text: "Reclamos",
        icon: <ShieldIcon />,
        roles: ["SGL-Promotec"]
    },
    {
        href: "/options",
        text: "Buscar / editar",
        icon: <SheetIcon />,
        roles: ["SGL-Promotec"]
    },
    {
        href: "/memos",
        text: "Memofichas",
        icon: <CardIcon />,
        roles: ["SGL-Promotec"]
    },
    {
        href: "/reports",
        text: "Informes",
        icon: <LikeIcon />,
        roles: ["SGL-Promotec"]
    },
    {
        href: "/users",
        text: "Usuarios",
        icon: <UsersIcon />,
        roles: ["SGL-Tecnologia"]
    },
    {
        href: "/roles",
        text: "Rol",
        icon: <SheetIcon />,
        roles: ["SGL-Tecnologia"]
    },
];

const NavItem: React.FC<{
    href: string,
    text: string,
    icon: React.ReactNode
}> = ({ href, text, icon }) => {
    return (
        <Link to={href}
            className=
            "flex items-center gap-[14px] py-3 px-6 h-14 [&.active]:bg-[#FFF6EB] [&.active]:border-[0.5px] [&.active]:border-tirth rounded-[10px] hover:bg-princ-blue [&.active]:hover:bg-[#FFF6EB] transition group"
        >
            <div
                className="size-8 rounded-lg grid place-items-center bg-white2 shadow-sm group-[.active]:shadow-none group-[.active]:bg-tirth text-tirth group-[.active]:text-white"
            >
                {icon}
            </div>
            <h5 className="text-text3 group-[.active]:text-secn-blue group-[.active]:font-bold">
                {text}
            </h5>
        </Link>
    )
}

type Props = {

}

const Sidebar: React.FC<Props> = () => {

    const { user } = useStore((state) => state);
    const [transitioning, setTransitioning] = useState(false);
    const { onLogOut, token } = useAuth()
    const navFiltered = nav.filter(i => i.roles.includes(token.role))

    const handleLogOut = useCallback(() => {
        if (transitioning) onLogOut();
    }, [onLogOut, transitioning]);

    if (!user) return <SidebarSkeleton />

    return (
        <>
            {transitioning && <div className="fixed top-0 left-0 w-full h-screen bg-princ-blue z-50 animate-show" onAnimationEnd={handleLogOut}></div>}
            <aside className="flex flex-col h-[calc(100vh-96px)] py-5 sticky top-0">
                <nav className="flex-1">
                    <ul className="space-y-[10px]">
                        {
                            navFiltered.map((i) => {
                                return (
                                    <li key={i.href}>
                                        <NavItem
                                            href={i.href}
                                            text={i.text}
                                            icon={i.icon}
                                        />
                                    </li>
                                );
                            })
                        }
                    </ul>
                </nav>

                <SideUser user={user} role={token.role} onExit={() => setTransitioning(true)} />
            </aside>
        </>

    )
}

export default Sidebar;