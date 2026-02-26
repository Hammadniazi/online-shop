import React from "react";

interface StyledButtonProps {
  children: React.ReactNode;
  onClick?: () => void;

  variant?: "primary" | "secondary";
}

export function StyledButton({
  children,
  onClick,
  variant = "primary",
}: StyledButtonProps) {
  const baseStyles =
    "font-semibold py-2 px-4 rounded shadow-md transition duration-150 ease-in-out";

  const primaryStyles = "bg-blue-500 hover:bg-blue-700 text-white";
  const secondaryStyles = "bg-gray-300 hover:bg-gray-400 text-gray-800";

  const variantStyles = variant === "primary" ? primaryStyles : secondaryStyles;

  return (
    <button className={`${baseStyles} ${variantStyles}`} onClick={onClick}>
      {children}
    </button>
  );
}
