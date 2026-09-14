"use client";

import { useEffect, useState } from "react";
import { VOTE_DEADLINE } from "@/data/trip";

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  };
}

export function Countdown() {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date(VOTE_DEADLINE).getTime();
    const tick = () => setLeft(target - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (left === null) {
    return <p className="text-[12px] text-mute">Clôture le 28 septembre 2026</p>;
  }

  if (left <= 0) {
    return (
      <p className="text-[12px] font-semibold text-rose-300">
        Le vote est clos depuis le 28 septembre 2026
      </p>
    );
  }

  const { d, h, m, s } = parts(left);
  const cells = [
    { v: d, l: "j" },
    { v: h, l: "h" },
    { v: m, l: "min" },
    { v: s, l: "s" },
  ];

  return (
    <div>
      <p className="overline mb-2">Clôture du vote</p>
      <div className="flex gap-2">
        {cells.map((c) => (
          <div
            key={c.l}
            className="glass min-w-[58px] rounded-xl px-3 py-2 text-center"
          >
            <span className="display block text-2xl tabular-nums">
              {String(c.v).padStart(2, "0")}
            </span>
            <span className="text-[10px] text-mute">{c.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
