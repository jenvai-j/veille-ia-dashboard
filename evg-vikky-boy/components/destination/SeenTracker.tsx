"use client";

import { useEffect } from "react";
import { useTrip } from "@/lib/trip-context";
import type { Slug } from "@/data/types";

export function SeenTracker({ slug }: { slug: Slug }) {
  const { markSeen, ready } = useTrip();
  useEffect(() => {
    if (ready) markSeen(slug);
  }, [ready, markSeen, slug]);
  return null;
}
