"use client";

import { Terminal as TerminalIcon} from "lucide-react";

type Props = {
  onOpen: () => void;
};

export function TerminalButton({ onOpen }: Props) {
  return (
    <button
  onClick={onOpen}
  className="fixed bottom-32 left-6 z-[999] p-3 rounded-full bg-black text-white border border-white/20 shadow-lg hover:bg-white hover:text-black transition"
  aria-label="Open terminal"
>
  <TerminalIcon className="h-5 w-5" />
</button>
  );
}