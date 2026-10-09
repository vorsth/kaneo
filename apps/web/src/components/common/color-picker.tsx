import { Ban } from "lucide-react";
import { useTranslation } from "react-i18next";
import labelColors from "@/constants/label-colors";
import { cn } from "@/lib/utils";

type ColorPickerProps = {
  size?: "sm" | "md";
  className?: string;
} & (
  | {
      // Offers a "no color" swatch, which reports null.
      allowNone: true;
      value: string | null | undefined;
      onChange: (color: string | null) => void;
    }
  | {
      allowNone?: false;
      value: string;
      onChange: (color: string) => void;
    }
);

const swatchSizes = { sm: "h-6 w-6", md: "h-8 w-8" };

/**
 * Swatch row for the shared palette. Values are palette keys
 * (`constants/label-colors`); render them with `resolveLabelColor`.
 */
export default function ColorPicker({
  size = "md",
  className,
  ...props
}: ColorPickerProps) {
  const { t } = useTranslation();
  const swatch = cn(
    "rounded-full border-2 transition-[scale,border-color]",
    swatchSizes[size],
  );

  return (
    <div
      className={cn(
        "flex flex-wrap items-center",
        size === "sm" ? "gap-1.5" : "gap-2",
        className,
      )}
    >
      {props.allowNone && (
        <button
          type="button"
          title={t("common:colorPicker.noColor")}
          aria-label={t("common:colorPicker.noColor")}
          aria-pressed={!props.value}
          className={cn(
            swatch,
            "flex items-center justify-center text-muted-foreground",
            props.value
              ? "border-transparent hover:scale-110"
              : "border-foreground",
          )}
          onClick={() => props.onChange(null)}
        >
          <Ban className="h-full w-full" />
        </button>
      )}
      {labelColors.map((c) => (
        <button
          key={c.value}
          type="button"
          title={c.label}
          aria-label={c.label}
          aria-pressed={props.value === c.value}
          className={cn(
            swatch,
            props.value === c.value
              ? "border-foreground scale-110"
              : "border-transparent hover:scale-110",
          )}
          style={{ backgroundColor: c.color }}
          onClick={() => props.onChange(c.value)}
        />
      ))}
    </div>
  );
}
