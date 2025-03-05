import type { SVGProps } from "react";

const LikeIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg
        width="15"
        height="13"
        viewBox="0 0 15 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M4 12C4 12.4922 3.58984 12.875 3.125 12.875H1.375C0.882812 12.875 0.5 12.4922 0.5 12V5.875C0.5 5.41016 0.882812 5 1.375 5H3.125C3.58984 5 4 5.41016 4 5.875V12ZM14.5 5.90234C14.5 6.58594 13.9531 7.16016 13.2695 7.1875C13.4883 7.43359 13.625 7.73438 13.625 8.08984C13.625 8.71875 13.1602 9.26562 12.5312 9.375C12.668 9.56641 12.75 9.78516 12.75 10.0586C12.75 10.6328 12.3672 11.125 11.8203 11.2891C11.8477 11.3711 11.875 11.4805 11.875 11.5898C11.875 12.3008 11.2734 12.875 10.5625 12.875H8.94922C7.99219 12.875 7.08984 12.5742 6.32422 12.0273L5.39453 11.3164C5.06641 11.0703 4.875 10.6875 4.875 10.2773V5.90234V5.875C4.875 5.49219 5.03906 5.13672 5.36719 4.86328L5.80469 4.50781C8.04688 2.73047 7.03516 0.625 8.75781 0.625C9.60547 0.625 10.125 1.30859 10.125 1.96484C10.125 2.375 9.79688 3.55078 9.16797 4.58984H13.1875C13.8984 4.58984 14.5 5.16406 14.5 5.90234Z"
            fill="currentColor"></path>
    </svg>

)

export default LikeIcon;