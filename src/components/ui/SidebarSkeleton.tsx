import React from "react";

const SidebarSkeleton: React.FC = () => {
    return (
        <aside className="flex flex-col h-full pb-5">
            <nav className="flex-1">
                <ul className="space-y-[10px]">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <li key={index}>
                            <div className="flex items-center gap-[14px] py-3 px-6 h-14 rounded-[10px] animate-pulse">
                                <div className="size-8 rounded-lg bg-gray-300"></div>
                                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                            </div>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="flex items-center gap-2 p-3 rounded-[10px] animate-pulse">
                <div className="size-11 rounded-full bg-gray-300"></div>
                <div className="flex flex-col space-y-1">
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                    <div className="h-3 bg-gray-300 rounded w-16"></div>
                </div>
            </div>
        </aside>
    );
};

export default SidebarSkeleton;
