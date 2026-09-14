import { STRENGTHS } from "@/data/comparison";

export function StrengthColumns() {
  return (
    <div className="space-y-4">
      {STRENGTHS.map((row) => (
        <div
          key={row.theme}
          className="rounded-2xl border border-bone/10 bg-ink-2 p-5"
        >
          <p className="flex items-center gap-2 text-[14px] font-semibold">
            <span aria-hidden>{row.icon}</span>
            {row.theme}
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div data-theme="ocean">
              <p
                className="text-[11px] font-bold tracking-[0.16em] uppercase"
                style={{ color: "var(--accent-1)" }}
              >
                🇮🇨 Tenerife
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-bone/85">
                {row.tenerife}
              </p>
            </div>
            <div data-theme="desert" className="sm:border-l sm:border-bone/10 sm:pl-4">
              <p
                className="text-[11px] font-bold tracking-[0.16em] uppercase"
                style={{ color: "var(--accent-1)" }}
              >
                🇲🇦 Marrakech
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-bone/85">
                {row.marrakech}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
