import React, { type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  const baseStyle = "rounded font-semibold focus:outline-none transition";

  const variantStyle =
    variant === "primary"
      ? "bg-green-500 text-white hover:bg-green-600"
      : variant === "secondary"
      ? "bg-green-300 text-green-800 hover:bg-green-400"
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
