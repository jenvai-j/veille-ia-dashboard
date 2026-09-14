import type { Metadata, Viewport } from "next";
import "./globals.css";
import { TripProvider } from "@/lib/trip-context";
import { VoteBar } from "@/components/vote/VoteBar";

export const metadata: Metadata = {
  title: "EVG Vikky Boy — 27 au 31 janvier 2027",
  description:
    "Deux destinations, un seul vote. Tenerife ou Marrakech pour l'EVG de Vikky.",
  robots: { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  themeColor: "#08090A",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <TripProvider>
          <div className="pb-20">{children}</div>
          <VoteBar />
        </TripProvider>
      </body>
    </html>
  );
}
