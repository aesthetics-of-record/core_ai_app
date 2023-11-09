"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { IoColorPalette } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useTheme from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export function ThemeMenu() {
  const { setTheme } = useTheme();
  const themes = ["dark-rose", "dark-blue", "dark-orange"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <IoColorPalette color={"hsl(var(--primary))"} size={16} />
          <span className="sr-only">theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((theme) => {
          return (
            <DropdownMenuItem key={theme} onClick={() => setTheme(theme)}>
              <div className={cn("flex", theme)}>
                <div
                  className={cn(
                    "w-2.5 h-5 rounded-tl-full rounded-bl-full",
                    "bg-background"
                  )}
                ></div>
                <div
                  className={cn(
                    "w-2.5 h-5 rounded-tr-full rounded-br-full",
                    "bg-primary"
                  )}
                ></div>
                <div className="ml-3">
                  <p>{theme}</p>
                </div>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
