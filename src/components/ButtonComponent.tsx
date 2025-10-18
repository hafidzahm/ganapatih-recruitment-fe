import { Button } from "@/components/ui/button";
import React, { type MouseEvent } from "react";

export default function ButtonComponent({
  type,
  className,
  variant,
  text,
  handleClick,
  children,
}: {
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
  variant?: "default" | "noShadow" | "neutral" | "reverse" | null | undefined;
  text?: string;
  children?: React.ReactNode;
  // onClick is required because every button should have a click handler
  handleClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <Button
      type={type}
      className={className}
      variant={variant}
      onClick={handleClick}
    >
      {text}
      {children}
    </Button>
  );
}
