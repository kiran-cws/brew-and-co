import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type InputProps = Omit<ComponentProps<"input">, "id"> & {
  id: string;
  label: string;
  showLabel?: boolean;
  error?: string;
};

export function Input({
  id,
  label,
  showLabel = false,
  error,
  className,
  ...props
}: InputProps) {
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <label
        htmlFor={id}
        className={cn(
          "font-sans text-sm font-medium text-ink",
          !showLabel && "sr-only",
        )}
      >
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={cn(
          "h-12 w-full rounded-control border border-line-strong bg-paper px-4",
          "font-sans text-base text-ink placeholder:text-text-placeholder",
          "transition-colors duration-150 hover:border-line-ink",
          "focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500",
          "disabled:border-line disabled:bg-mist disabled:text-text-muted",
          error && "border-danger focus:border-danger focus:ring-danger",
        )}
        {...props}
      />
      {error ? (
        <p id={errorId} role="alert" className="font-sans text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Input + button as one flush control. Children: exactly one <Input> and one <Button>.
 * The wrapper squares the inner corners; keep the button `variant="primary"`.
 */
export function InlineForm({
  className,
  children,
  ...props
}: ComponentProps<"form"> & { children: ReactNode }) {
  return (
    <form
      className={cn(
        "flex w-full items-start",
        "[&>*:first-child_input]:rounded-r-none [&>*:last-child]:rounded-l-none [&>*:last-child]:shrink-0",
        className,
      )}
      {...props}
    >
      {children}
    </form>
  );
}
