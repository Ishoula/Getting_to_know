"use client";

import { useState } from "react";
import { TerminalButton } from "./TerminalButton";
import { Terminal } from "./Terminal";

export function TerminalWrapper() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TerminalButton onOpen={() => setOpen(true)} />

      <Terminal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}