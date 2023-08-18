import React from "react";

type Props = {
  children: React.ReactNode;
  handleOnClick: () => void;
  styles?: string;
};

function Button({ children, handleOnClick, styles }: Props) {
  return (
    <button
      type="button"
      className={`${styles} inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800`}
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
}

export default Button;
