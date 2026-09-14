import { Check, TriangleAlert } from "lucide-react";

export function ProsCons({
  strengths,
  watchouts,
}: {
  strengths: string[];
  watchouts: string[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-6">
        <p className="mb-4 text-[13px] font-bold tracking-widest text-emerald-300 uppercase">
          Ce qui rend ça fort
        </p>
        <ul className="space-y-3">
          {strengths.map((s) => (
            <li key={s} className="flex gap-2.5 text-[13px] leading-relaxed">
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                aria-hidden
              />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-6">
        <p className="mb-4 text-[13px] font-bold tracking-widest text-amber-300 uppercase">
          Ce qui coince ou reste à vérifier
        </p>
        <ul className="space-y-3">
          {watchouts.map((w) => (
            <li key={w} className="flex gap-2.5 text-[13px] leading-relaxed">
              <TriangleAlert
                className="mt-0.5 h-4 w-4 shrink-0 text-amber-400"
                aria-hidden
              />
              <span>{w}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
