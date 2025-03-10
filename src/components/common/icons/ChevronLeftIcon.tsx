import type { SVGProps } from "react"
import type React from "react"

const ChevronLeftIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M7.3125 1.15625C7.4375 1.25 7.5 1.375 7.5 1.53125C7.5 1.625 7.4375 1.75 7.34375 1.84375L1.65625 8.03125L7.34375 14.1875C7.53125 14.375 7.53125 14.6875 7.3125 14.875C7.125 15.0625 6.8125 15.0625 6.625 14.8438L0.625 8.34375C0.4375 8.15625 0.4375 7.875 0.625 7.6875L6.625 1.1875C6.8125 0.96875 7.125 0.96875 7.3125 1.15625Z" fill="currentColor" />
    </svg>
)

export default ChevronLeftIcon;
