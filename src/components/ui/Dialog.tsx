type Props = {
    isOpen: boolean;
    children: React.ReactNode
}

const Dialog: React.FC<Props> = ({ isOpen, children }) => {

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-50 bg-[#000C3E]/50 backdrop-blur-sm"></div>
            <div className="fixed left-[50%] top-[50%] z-50 grid w-min max-w-7xl translate-x-[-50%] translate-y-[-50%] shadow-lg bg-white rounded-2xl overflow-hidden">
                {children}
            </div>
        </>
    )
}

export default Dialog;
