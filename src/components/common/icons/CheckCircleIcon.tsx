import type { SVGProps } from "react";

const CheckCircleIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M15 1.34627e-09C23.25 2.04043e-09 30 6.75 30 15C30 23.3125 23.25 30 15 30C6.6875 30 -2.04569e-09 23.3125 -1.34627e-09 15C-6.52097e-10 6.75 6.6875 6.46839e-10 15 1.34627e-09ZM22.1875 12.25C22.875 11.5625 22.875 10.5 22.1875 9.8125C21.5 9.125 20.4375 9.125 19.75 9.8125L13 16.5625L10.1875 13.8125C9.5 13.125 8.4375 13.125 7.75 13.8125C7.0625 14.5 7.0625 15.5625 7.75 16.25L11.75 20.25C12.0625 20.625 12.5 20.75 13 20.75C13.4375 20.75 13.875 20.625 14.1875 20.25L22.1875 12.25Z" fill="currentColor" />
    </svg>
)

export default CheckCircleIcon;