import { CheckCircle2, Circle } from "lucide-react";
import columnIcons, {
  DEFAULT_COLUMN_ICON_NAMES,
} from "@/constants/column-icons";
import { resolveLabelColor } from "@/lib/label-color";

export const getColumnIcon = (
  columnId: string,
  isFinal?: boolean,
  iconName?: string | null,
  color?: string | null,
) => {
  const resolvedIconName =
    iconName ||
    (Object.hasOwn(DEFAULT_COLUMN_ICON_NAMES, columnId)
      ? DEFAULT_COLUMN_ICON_NAMES[
          columnId as keyof typeof DEFAULT_COLUMN_ICON_NAMES
        ]
      : undefined);
  const Icon =
    (typeof resolvedIconName === "string" &&
      Object.hasOwn(columnIcons, resolvedIconName) &&
      columnIcons[resolvedIconName as keyof typeof columnIcons]) ||
    (isFinal ? CheckCircle2 : Circle);
  // Set on the stroke itself: callers recolor icons through `text-*` classes
  // (currentColor), which must not override a column's chosen color.
  const style = color ? { stroke: resolveLabelColor(color) } : undefined;

  return <Icon className="w-4 h-4 text-muted-foreground" style={style} />;
};
