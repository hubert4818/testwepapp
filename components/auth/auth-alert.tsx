import { AlertCircle, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";

export function AuthAlert({ message, variant = "error" }: { message?: string; variant?: "error" | "success" }) {
  if (!message) {
    return null;
  }

  return (
    <div
      className={cn(
        "mb-4 flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm",
        variant === "error" ? "border-destructive/20 bg-destructive/10 text-destructive" : "border-success/20 bg-success/10 text-success",
      )}
    >
      {variant === "error" ? <AlertCircle className="mt-0.5 h-4 w-4" /> : <CheckCircle2 className="mt-0.5 h-4 w-4" />}
      <p>{message}</p>
    </div>
  );
}
