import React from "react";

const PaginationSkeleton: React.FC = () => {
    return (
        <div className="flex gap-4 items-center">
            <div className="grow bg-gray-200 h-4 rounded"></div>
            <div className="flex items-center gap-2">
                <div className="bg-gray-200 h-4 w-24 rounded"></div>
                <div className="size-10 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="bg-gray-200 h-4 w-24 rounded"></div>
            <div className="flex gap-2">
                <div className="size-10 bg-gray-200 rounded-lg"></div>
                <div className="size-10 bg-gray-200 rounded-lg"></div>
                <div className="size-10 bg-gray-200 rounded-lg"></div>
                <div className="size-10 bg-gray-200 rounded-lg"></div>
            </div>
        </div>
    )
}

export default PaginationSkeleton;