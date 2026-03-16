import React from "react";
import { cn } from "@/src/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  className,
  as: Component = "span",
}) => {
  return (
    <Component className={cn("glitch inline-block", className)} data-text={text}>
      {text}
      <span aria-hidden="true">{text}</span>
      <span aria-hidden="true">{text}</span>
    </Component>
  );
};
