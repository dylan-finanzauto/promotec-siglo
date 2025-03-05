import type React from "react"
import promotec from "../../assets/svg/promotec.svg"

type Props = {
    onAnimationEnd?: () => void
}

const Loader: React.FC<Props> = ({ onAnimationEnd }) => {
    return (
        <>
            <div className="h-screen w-full bg-gray1 fixed z-10 bottom-0 left-0 animate-climb"></div>
            <div
                className="h-screen w-full grid place-items-center fixed z-20 top-0 left-0"
            >
                <img className="w-[150px] animate-presence" onAnimationEnd={onAnimationEnd} src={promotec} alt="" />
            </div>
        </>
    )
}

export default Loader;