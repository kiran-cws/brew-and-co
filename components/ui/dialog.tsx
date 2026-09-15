"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { IconButton } from "@/components/ui/icon-button";
import { CloseIcon } from "@/components/ui/icons";

export type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
};

/**
 * Native <dialog> shown with showModal(): focus is trapped, the page is inert,
 * Escape closes it, and focus returns to the opener when it closes.
 */
export function Dialog({ open, onClose, title, children, className }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    else if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className={cn(
        "m-auto w-[calc(100%-2rem)] max-w-lg rounded-card bg-paper p-0 text-ink shadow-card",
        className,
      )}
    >
      <div className="flex flex-col gap-6 p-6 sm:p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="font-display text-2xl font-bold text-ink">
            {title}
          </h2>
          <IconButton label="Close" shape="square" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        {children}
      </div>
    </dialog>
  );
}
