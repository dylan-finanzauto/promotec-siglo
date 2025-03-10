import React from 'react';

type Props = {
    cols: string[];
    rows: number;
};

const TableSkeleton: React.FC<Props> = ({ cols, rows }) => {
    return (
        <div className="overflow-x-auto rounded-lg border border-[#DEE5ED]">
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        {cols.map((_, index) => (
                            <th key={index} className="text-sm px-4 text-center py-5 font-medium whitespace-nowrap text-text2 border-b border-[#DEE5ED]">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                            </th>
                        ))}
                        <th className="px-3 py-2 border-b border-[#DEE5ED]"></th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                        <tr key={rowIndex}>
                            {cols.map((_, colIndex) => (
                                <td key={colIndex} className="text-sm px-4 py-5 whitespace-nowrap text-text text-center">
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                                </td>
                            ))}
                            <td className="relative px-3 py-2 grid place-items-center">
                                <div className="h-4 bg-gray-200 rounded w-6 mx-auto"></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableSkeleton;