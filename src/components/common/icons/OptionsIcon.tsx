import type { SVGProps } from "react";

const OptionsIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg width="10" height="3" viewBox="0 0 10 3" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M1.85938 2.25H0.203125V0.59375H1.85938V2.25ZM5.57812 2.25H3.92188V0.59375H5.57812V2.25ZM9.29688 2.25H7.64062V0.59375H9.29688V2.25Z" fill="currentColor" />
        </svg>
    )
}

export default OptionsIcon;
