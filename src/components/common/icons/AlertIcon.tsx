import type { SVGProps } from "react";

const AlertIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg width="34" height="29" viewBox="0 0 34 29" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M32.625 25.0625C33.625 26.8125 32.375 29 30.3125 29L3.625 29C1.5625 29 0.3125 26.8125 1.3125 25.0625L14.625 2.3125C15.6875 0.5625 18.25 0.5625 19.25 2.3125L32.625 25.0625ZM15.5 9.5L15.5 17.5C15.5 18.375 16.125 19 17 19C17.8125 19 18.5 18.375 18.5 17.5L18.5 9.5C18.5 8.6875 17.8125 8 17 8C16.125 8 15.5 8.6875 15.5 9.5ZM17 25C18.0625 25 18.9375 24.125 18.9375 23.0625C18.9375 22 18.0625 21.125 17 21.125C15.875 21.125 15 22 15 23.0625C15 24.125 15.875 25 17 25Z" fill="currentColor" />
    </svg>
)

export default AlertIcon;
