import { cn } from "@workspace/ui/lib/utils";

export const WidgetHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <header
      className={cn(
        "bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-4 text-primary-foreground shadow-lg",
        className,
      )}
    >
      {children}
    </header>
  );
};
