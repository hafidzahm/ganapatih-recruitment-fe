import { Button } from "@/components/ui/button";

export default function ButtonComponent({
  type,
  className,
  variant,
  text,
}: {
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
  variant?: "default" | "noShadow" | "neutral" | "reverse" | null | undefined;
  text: string;
}) {
  return (
    <Button type={type} className={className} variant={variant}>
      {text}
    </Button>
  );
}
