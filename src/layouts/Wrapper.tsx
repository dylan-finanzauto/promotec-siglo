import clsx from "clsx";

type Props = {
    className?: string,
    children: React.ReactNode
}

const Wrapper: React.FC<Props> = ({ className, children }) => (
    <div className={clsx("max-w-7xl w-7xl min-w-0 mx-auto", className)}>
        {children}
    </div>
)

export default Wrapper;