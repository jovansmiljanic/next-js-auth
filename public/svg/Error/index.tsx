import { Colors } from "@/types";

export const ErrorIcon = ({
  width,
  height,
  color,
}: {
  width: number;
  height: number;
  color: Colors;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.0417 19.875H16.9583V22.7917H14.0417V19.875ZM14.0417 8.20833H16.9583V16.9583H14.0417V8.20833ZM15.4854 0.916666C7.43542 0.916666 0.916666 7.45 0.916666 15.5C0.916666 23.55 7.43542 30.0833 15.4854 30.0833C23.55 30.0833 30.0833 23.55 30.0833 15.5C30.0833 7.45 23.55 0.916666 15.4854 0.916666ZM15.5 27.1667C9.05417 27.1667 3.83333 21.9458 3.83333 15.5C3.83333 9.05417 9.05417 3.83333 15.5 3.83333C21.9458 3.83333 27.1667 9.05417 27.1667 15.5C27.1667 21.9458 21.9458 27.1667 15.5 27.1667Z"
        fill={color}
      />
    </svg>
  );
};
