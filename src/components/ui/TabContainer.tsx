import React, { useState } from 'react';

type TabProps = {
    title: string;
    children: React.ReactNode;
};

type TabContainerProps = {
    children: React.ReactElement<TabProps>[];
};

export const Tab: React.FC<TabProps> = ({ children }) => {
    return <>{children}</>;
};

export const TabContainer: React.FC<TabContainerProps> = ({ children }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div>
            <div className="grid grid-cols-3 h-10">
                {React.Children.map(children, (child, index) => (
                    <div
                        className={`grid place-items-center rounded-t-xl cursor-pointer ${activeTab === index ? 'bg-white text-secn-blue font-bold' : 'font-semibold text-[#888888]'
                            }`}
                        onClick={() => setActiveTab(index)}
                    >
                        {child.props.title}
                    </div>
                ))}
            </div>
            <div className="bg-white p-5 space-y-5 rounded-b-[14px]">
                {children[activeTab]}
            </div>
        </div>
    );
};