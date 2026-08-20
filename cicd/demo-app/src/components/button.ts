export type ButtonVariant = "primary" | "ghost";

export function buttonLabel(variant: ButtonVariant, loading: boolean): string {
  if (loading) return "Loading…";
  return variant === "primary" ? "Continue" : "Cancel";
}

export function isDisabled(loading: boolean, disabled: boolean): boolean {
  return loading || disabled;
}
