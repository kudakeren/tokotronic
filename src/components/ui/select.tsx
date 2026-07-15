"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Select({ value, onValueChange, children }: { value?: string; onValueChange?: (value: string) => void; children: React.ReactNode }) {
  return <SelectPrimitive.Root value={value} onValueChange={onValueChange}>{children}</SelectPrimitive.Root>;
}

export function SelectTrigger({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <SelectPrimitive.Trigger className={cn("flex h-10 w-full min-w-0 items-center justify-between gap-2 rounded-md border border-input bg-background px-3 text-left text-sm", className)}>
      <span className="min-w-0 truncate">{children}</span>
      <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
    </SelectPrimitive.Trigger>
  );
}

export const SelectValue = SelectPrimitive.Value;

export function SelectContent({ children }: { children: React.ReactNode }) {
  return <SelectPrimitive.Portal><SelectPrimitive.Content position="popper" sideOffset={4} className="z-50 max-w-[calc(100vw-2rem)] overflow-hidden rounded-md border bg-card shadow-md"><SelectPrimitive.Viewport className="min-w-[var(--radix-select-trigger-width)] p-1">{children}</SelectPrimitive.Viewport></SelectPrimitive.Content></SelectPrimitive.Portal>;
}

export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  return <SelectPrimitive.Item value={value} className="relative flex max-w-[calc(100vw-2rem)] cursor-default select-none items-center rounded-sm px-3 py-2 text-sm outline-none focus:bg-muted"><SelectPrimitive.ItemText><span className="block truncate">{children}</span></SelectPrimitive.ItemText></SelectPrimitive.Item>;
}
