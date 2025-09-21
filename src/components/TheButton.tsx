import React, { type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface TheButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export const TheButton: React.FC<TheButtonProps> = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  const baseStyle =
    "rounded-[8px] py-[.5rem] px-[1rem] font-semibold gap-[4px] cursor-pointer items-center inline-flex focus:outline-none transition";

  const variantStyle =
    variant === "primary"
      ? "bg-indigo-800/80 text-white hover:bg-indigo-800 "
      : variant === "secondary"
      ? "bg-indigo-300 text-indigo-800 hover:bg-indigo-400"
      : "bg-red-500 text-white hover:bg-red-600";

  const sizeStyle =
    size === "sm"
      ? "px-3 py-1 text-sm"
      : size === "md"
      ? "px-4 py-2 text-base"
      : "px-6 py-3 text-lg";

  const combinedClass = `${baseStyle} ${variantStyle} ${sizeStyle} ${className}`;

  return (
    <button className={combinedClass} {...props}>
      {children}
    </button>
  );
};
