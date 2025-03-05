import type { SVGProps } from "react";

const ShieldIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M13.2422 3.04688C13.7344 3.26562 14.0625 3.73047 14.0625 4.25C14.0625 11.25 8.89453 14.75 7.47266 14.75C6.10547 14.75 0.9375 11.3047 0.9375 4.25C0.9375 3.73047 1.23828 3.26562 1.73047 3.04688L6.98047 0.859375C7.11719 0.804688 7.33594 0.75 7.5 0.75C7.63672 0.75 7.85547 0.804688 7.99219 0.859375L13.2422 3.04688ZM7.5 12.9727C9.22266 12.1797 12.1758 9.5 12.2852 4.55078L7.5 2.55469V12.9727Z"
            fill="currentColor"></path>
    </svg>

)

export default ShieldIcon;