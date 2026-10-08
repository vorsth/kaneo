import { CheckCircle2, Circle, CircleDot } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vite-plus/test";
import { getColumnIcon } from "./column";

describe("stored column icons", () => {
  it.each([
    "__proto__",
    "constructor",
    "toString",
    "hasOwnProperty",
    "unknown-icon",
  ])("uses safe fallbacks for %s", (name) => {
    expect(getColumnIcon("to-do", false, name).type).toBe(Circle);
    expect(getColumnIcon("done", true, name).type).toBe(CheckCircle2);
    expect(getColumnIcon(name, false).type).toBe(Circle);
    expect(() =>
      renderToStaticMarkup(getColumnIcon("to-do", false, name)),
    ).not.toThrow();
  });
  it("keeps selected and default icons", () => {
    expect(getColumnIcon("to-do", false, "CircleDot").type).toBe(CircleDot);
    expect(getColumnIcon("in-progress").type).toBe(CircleDot);
    expect(getColumnIcon("done").type).toBe(CheckCircle2);
  });
  it("strokes the icon with the column color", () => {
    expect(
      getColumnIcon("to-do", false, "CircleDot", "#ff0000").props.style,
    ).toEqual({ stroke: "#ff0000" });
    expect(getColumnIcon("to-do", false, null, "purple").props.style).toEqual({
      stroke: "var(--color-violet-500)",
    });
    expect(getColumnIcon("custom", true, "nope", "red").props.style).toEqual({
      stroke: "var(--color-red-600)",
    });
  });
  it("leaves uncolored columns on the inherited color", () => {
    expect(getColumnIcon("to-do", false, "CircleDot").props.style).toBe(
      undefined,
    );
    expect(getColumnIcon("to-do", false, null, null).props.style).toBe(
      undefined,
    );
  });
});
