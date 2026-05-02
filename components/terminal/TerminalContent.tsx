
"use client";
import { useState } from "react";

export function TerminalContent() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "Ishoula Terminal — type 'help' to begin",
  ]);

  const commands: Record<string, string> = {
    help: `
Available commands:
- about
- projects
- skills
- contact
- clear
    `.trim(),

    about: "I build full-stack systems that feel alive — structured, scalable, intentional.",

    skills: "React, Next.js, Node.js, Express, MongoDB, PostgreSQL",

    projects: "Pesa Tracker, CityScape, Smart Poultry, Livora, AlmaSync",

    contact: "Email: shoulamite2k@email.com | GitHub: https://github.com/Ishoula",
  };

  const runCommand = (cmd: string) => {
    const clean = cmd.toLowerCase().trim();

    if (clean === "clear") {
      setHistory([]);
      return;
    }

    const output =
      commands[clean] || `command not found: ${cmd}`;

    setHistory((prev) => [
      ...prev,
      `$ ${cmd}`,
      output,
    ]);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    runCommand(input);
    setInput("");
  };

  return (
    <div>
      <div className="space-y-1 mb-4">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap text-white/90">
            {line}
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="flex">
        <span className="mr-2">I.Shoula$</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent outline-none flex-1 text-white"
          autoFocus
        />
      </form>
    </div>
  );
}