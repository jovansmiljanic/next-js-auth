export const EyeOffIcon = ({
  width,
  height,
  color,
}: {
  width?: number;
  height?: number;
  color?: string;
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="30px"
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      color="textColorPrimary"
    >
      <path d="M2.22 2.22a.75.75 0 0 0-.07.98l.07.08 4.03 4.03a9.99 9.99 0 0 0-3.95 5.75.75.75 0 0 0 1.45.37 8.49 8.49 0 0 1 3.58-5.04l1.81 1.81A3.99 3.99 0 0 0 12 17c1.09 0 2.08-.43 2.8-1.14l5.92 5.92a.75.75 0 0 0 1.13-.98l-.07-.08-6.11-6.11-1.2-1.2-2.87-2.87-2.88-2.88-1.13-1.13-4.31-4.31a.75.75 0 0 0-1.06 0Zm7.98 9.05 3.54 3.53A2.5 2.5 0 0 1 9.5 13c0-.67.27-1.28.7-1.73ZM12 5.5a10 10 0 0 0-2.89.42l1.24 1.24a8.52 8.52 0 0 1 9.9 6.27.75.75 0 0 0 1.45-.36A10 10 0 0 0 12 5.5Zm.2 3.5 3.8 3.81a4 4 0 0 0-3.8-3.8Z"></path>
    </svg>
  );
};
