"use client";

import * as React from "react";
import { cn } from "@workspace/ui/lib/utils";

interface ColorPickerProps {
  colors: string[];
  value: string;
  onValueChange: (color: string) => void;
  className?: string;
}

const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  ({ colors, value, onValueChange, className }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-wrap gap-2", className)}>
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            className={cn(
              "w-8 h-8 rounded-full border-2 transition-transform transform hover:scale-110",
              value === color
                ? "border-primary ring-2 ring-primary"
                : "border-transparent"
            )}
            style={{ backgroundColor: color }}
            onClick={() => onValueChange(color)}
          />
        ))}
      </div>
    );
  }
);

ColorPicker.displayName = "ColorPicker";

export { ColorPicker };
