import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  full?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  full = false,
  className,
  children,
  ...props
}) => {
  const baseStyles =
    "rounded-lg font-semibold transition-all focus:outline-none";

  const variantStyles = {
    primary:
      "bg-primary-dark text-text font-semibold hover:opacity-80 active:opacity-60",
    secondary:
      "bg-secondary-dark text-text font-semibold hover:opacity-80 active:opacity-60",
    ghost:
      "bg-transparent border border-textSecondary text-textSecondary hover:text-text hover:border-text active:opacity-60",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        full && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
