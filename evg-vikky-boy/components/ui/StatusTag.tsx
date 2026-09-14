import type { PriceStatus } from "@/data/types";

const MAP: Record<
  PriceStatus,
  { label: string; dot: string; text: string; ring: string }
> = {
  CONFIRMED: {
    label: "Confirmé",
    dot: "bg-emerald-400",
    text: "text-emerald-300",
    ring: "ring-emerald-400/25",
  },
  OBSERVED: {
    label: "Prix constaté",
    dot: "bg-sky-400",
    text: "text-sky-300",
    ring: "ring-sky-400/25",
  },
  ESTIMATED: {
    label: "Budget de travail",
    dot: "bg-amber-400",
    text: "text-amber-300",
    ring: "ring-amber-400/25",
  },
  TO_VERIFY: {
    label: "À vérifier",
    dot: "bg-zinc-400",
    text: "text-zinc-300",
    ring: "ring-zinc-400/25",
  },
  OPTIONAL: {
    label: "Option",
    dot: "bg-violet-400",
    text: "text-violet-300",
    ring: "ring-violet-400/25",
  },
};

export function StatusTag({
  status,
  compact = false,
}: {
  status: PriceStatus;
  compact?: boolean;
}) {
  const s = MAP[status];
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full ring-1 ${s.ring} ${s.text} ${
        compact ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]"
      } font-medium tracking-wide whitespace-nowrap`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

export const STATUS_LABELS = MAP;
