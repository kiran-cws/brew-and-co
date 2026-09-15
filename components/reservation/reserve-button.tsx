"use client";

import { useState } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { ReservationForm } from "@/components/reservation/reservation-form";

type Props = {
  className?: string;
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
  children?: string;
};

/**
 * Links to /reserve without JavaScript; with it, opens the reservation
 * form in a dialog over the current page.
 */
export function ReserveButton({
  className,
  size = "md",
  variant = "primary",
  children = "Reserve a table",
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        href="/reserve"
        size={size}
        variant={variant}
        className={className}
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        {children}
      </Button>
      {open ? (
        <Dialog open={open} onClose={() => setOpen(false)} title="Reserve a table">
          <ReservationForm onDone={() => setOpen(false)} />
        </Dialog>
      ) : null}
    </>
  );
}
