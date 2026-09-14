"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Frame } from "@/components/ui/Frame";

export function Hero() {
  return (
    <header className="relative h-[100svh] min-h-[560px] w-full">
      <Frame slot="home-hero" scrim="strong" className="absolute inset-0 h-full w-full" />

      <div className="relative z-10 flex h-full flex-col justify-between px-5 pt-[max(1.5rem,env(safe-area-inset-top))] pb-8 sm:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="overline text-bone/70"
        >
          Privé · 🤫 Ne pas transférer à Vikky
        </motion.p>

        <div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="editorial mb-3 text-[clamp(1.1rem,4.5vw,1.6rem)] text-gold"
          >
            27 → 31 janvier 2027
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="display text-[clamp(3.4rem,17vw,9rem)]"
          >
            EVG
            <br />
            Vikky Boy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="mt-5 max-w-md text-[15px] leading-relaxed text-bone/80 sm:text-base"
          >
            8 gars. 4 nuits. 2 destinations. 1 Vikky Boy.
            <br />
            <span className="text-mute">
              Les deux plans sont chiffrés, sourcés et comparables. À vous de trancher.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <Link
              href="#final-two"
              className="rounded-full bg-bone px-7 py-3.5 text-[14px] font-bold text-ink transition active:scale-95"
            >
              Découvrir les 2 plans
            </Link>
            <Link
              href="/face-to-face"
              className="rounded-full px-5 py-3.5 text-[14px] font-semibold text-bone/80 ring-1 ring-bone/25 transition hover:text-bone"
            >
              Comparer directement
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center"
        >
          <ChevronDown className="h-5 w-5 animate-bounce text-bone/40" aria-hidden />
        </motion.div>
      </div>
    </header>
  );
}
