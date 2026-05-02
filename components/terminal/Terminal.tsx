"use client";

import { useEffect } from "react";
import { TerminalContent } from "./TerminalContent";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function Terminal({ open, onClose }: Props) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70">
      <div className="w-full max-w-2xl bg-black border border-white/20 rounded-lg overflow-hidden">
        <div className="flex justify-between px-4 py-2 border-b border-white/10">
          <span className="text-white text-sm font-mono">Ishoula Terminal</span>

          <button onClick={onClose} className="text-white/70 hover:text-white">
            ✕
          </button>
        </div>

        <div className="p-4 font-mono text-white text-sm h-80 overflow-y-auto">
          <TerminalContent />
        </div>
      </div>
    </div>
  );
}
