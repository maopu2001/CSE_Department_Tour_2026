"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    if (!resolvedTheme) return;
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted)
    return (
      <Button variant="outline" size="icon">
        <div className="size-5" />
      </Button>
    );

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative"
    >
      {/* Sun */}
      <Sun
        className={`absolute h-5 w-5 transition-transform duration-500 
          ${resolvedTheme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"}`}
      />
      {/* Moon */}
      <Moon
        className={`absolute h-5 w-5 transition-transform duration-500
          ${resolvedTheme === "dark" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}
      />
      <span className="sr-only">
        {resolvedTheme === "dark"
          ? "Switch to light mode"
          : "Switch to dark mode"}
      </span>
    </Button>
  );
}
