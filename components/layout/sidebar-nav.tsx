import Link from "next/link";

import { cn } from "@/lib/utils";

type SidebarNavProps = {
  items: { href: string; label: string }[];
};

export function SidebarNav({ items }: SidebarNavProps) {
  return (
    <nav className="grid gap-2">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
