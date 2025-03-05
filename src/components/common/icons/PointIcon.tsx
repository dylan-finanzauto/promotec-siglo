import type { SVGProps } from "react"

const PointIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="4" height="4" rx="2" fill="currentColor" />
    </svg>
)

export default PointIcon;
