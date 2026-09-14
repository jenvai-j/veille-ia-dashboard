"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export function AccessForm() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error ?? "Code incorrect.");
        setBusy(false);
        return;
      }
      router.replace("/");
      router.refresh();
    } catch {
      setError("Réseau indisponible.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-7">
      <label htmlFor="code" className="sr-only">
        Code d&apos;accès
      </label>
      <input
        id="code"
        name="code"
        type="text"
        inputMode="text"
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect="off"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Code d'accès"
        className="w-full rounded-2xl border border-bone/20 bg-ink-2 px-5 py-4 text-[16px] outline-none placeholder:text-mute focus:border-gold"
      />
      {error && <p className="mt-2.5 text-[13px] text-rose-300">{error}</p>}
      <button
        type="submit"
        disabled={busy || !code}
        className="mt-3 w-full rounded-2xl bg-bone px-5 py-4 text-[14px] font-bold text-ink transition active:scale-[0.99] disabled:opacity-40"
      >
        {busy ? "Vérification…" : "Entrer"}
      </button>
    </form>
  );
}
