import type { SVGProps } from "react";

const SheetIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg
        width="12"
        height="15"
        viewBox="0 0 12 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M7.75 0.75L11.25 4.25H7.75V0.75ZM6.875 4.25C6.875 4.74219 7.25781 5.125 7.75 5.125H11.25V13.4375C11.25 14.1758 10.6484 14.75 9.9375 14.75H2.0625C1.32422 14.75 0.75 14.1758 0.75 13.4375V2.0625C0.75 1.35156 1.32422 0.75 2.0625 0.75H6.875V4.25Z"
            fill="currentColor"></path>
    </svg>

)

export default SheetIcon;