import * as React from "react";
import { cn } from "@/lib/utils";

// Note: I am implementing a simplified version without cva/radix first to avoid extra dependencies if not installed.
// But wait, user requested "Button component (Standard & Icon)".
// I'll stick to a standard React component with Tailwind classes for now.

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading,
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-2xl font-heading font-bold transition-transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variantStyles = {
      primary:
        "bg-neutral-text text-neutral-background hover:bg-white active:scale-95 transition-all duration-200",
      secondary:
        "bg-neutral-card text-neutral-text border border-neutral-muted/20 hover:border-neutral-muted/50 active:scale-95 transition-all duration-200",
      outline:
        "border border-neutral-muted text-neutral-text bg-transparent hover:bg-neutral-card active:scale-95 transition-all",
      ghost:
        "bg-transparent text-neutral-muted hover:text-neutral-text hover:bg-neutral-card/50 transition-colors",
    };

    const sizeStyles = {
      sm: "h-10 px-4 text-base",
      md: "h-14 px-8 text-xl",
      lg: "h-16 px-10 text-2xl",
      icon: "h-12 w-12",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? <span className="animate-spin mr-2">⏳</span> : null}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button };
