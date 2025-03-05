import React, { SVGProps } from "react";

const ClipIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M10 3.5V11C10 13.7812 7.75 16 5 16C2.21875 16 0 13.7812 0 11V6.5C0 6.25 0.21875 6 0.5 6C0.75 6 1 6.25 1 6.5V11C1 13.2188 2.78125 15 5 15C7.1875 15 9 13.2188 9 11V3.5C9 2.125 7.875 1 6.5 1C5.09375 1 4 2.125 4 3.5V10C4 10.5625 4.4375 11 5 11C5.53125 11 6 10.5625 6 10V4.5C6 4.25 6.21875 4 6.5 4C6.75 4 7 4.25 7 4.5V10C7 11.125 6.09375 12 5 12C3.875 12 3 11.125 3 10V3.5C3 1.59375 4.5625 0 6.5 0C8.40625 0 10 1.59375 10 3.5Z" fill="currentColor" />
    </svg>
)

export default ClipIcon;