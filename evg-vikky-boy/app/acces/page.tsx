import type { Metadata } from "next";
import { AccessForm } from "@/components/ui/AccessForm";

export const metadata: Metadata = {
  title: "Accès privé",
  description: "Cette page est protégée.",
  robots: { index: false, follow: false },
};

export default function AccessPage() {
  return (
    <main className="flex min-h-[100svh] items-center justify-center px-5 py-12">
      <div className="w-full max-w-sm">
        <p className="eyebrow mb-3">Accès privé</p>
        <h1 className="display text-[clamp(2.4rem,11vw,3.6rem)]">
          Pas si vite
        </h1>
        <p className="mt-4 text-[14px] leading-relaxed text-mute">
          Cette page est réservée aux organisateurs. Le code a été envoyé dans
          le groupe.
        </p>
        <AccessForm />
        <p className="mt-8 text-[12px] leading-relaxed text-mute">
          Si tu t&apos;appelles Vikky, tu t&apos;es trompé de lien. Fais demi-tour.
        </p>
      </div>
    </main>
  );
}
