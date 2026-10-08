import { Ban } from "lucide-react";
import { useTranslation } from "react-i18next";
import labelColors from "@/constants/label-colors";
import { cn } from "@/lib/utils";

type ColumnColorPickerProps = {
  value: string | null | undefined;
  onChange: (color: string | null) => void;
};

export default function ColumnColorPicker({
  value,
  onChange,
}: ColumnColorPickerProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <button
        type="button"
        title={t("settings:columnEditor.noColor")}
        aria-label={t("settings:columnEditor.noColor")}
        aria-pressed={!value}
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-full border-2 text-muted-foreground transition-[scale,border-color]",
          value ? "border-transparent hover:scale-110" : "border-foreground",
        )}
        onClick={() => onChange(null)}
      >
        <Ban className="h-4 w-4" />
      </button>
      {labelColors.map((c) => (
        <button
          key={c.value}
          type="button"
          title={c.label}
          aria-label={c.label}
          aria-pressed={value === c.value}
          className={cn(
            "h-6 w-6 rounded-full border-2 transition-[scale,border-color]",
            value === c.value
              ? "border-foreground scale-110"
              : "border-transparent hover:scale-110",
          )}
          style={{ backgroundColor: c.color }}
          onClick={() => onChange(c.value)}
        />
      ))}
    </div>
  );
}
