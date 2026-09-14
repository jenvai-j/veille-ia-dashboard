import type { ReactNode } from "react";

export function Section({
  id,
  overline,
  title,
  lede,
  children,
  className = "",
}: {
  id?: string;
  overline?: string;
  title?: string;
  lede?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`px-5 py-16 sm:px-8 md:py-24 ${className}`}>
      <div className="mx-auto w-full max-w-5xl">
        {(overline || title) && (
          <header className="mb-8 md:mb-12">
            {overline && <p className="overline mb-3">{overline}</p>}
            {title && (
              <h2 className="display text-[clamp(2.2rem,8vw,4.5rem)]">{title}</h2>
            )}
            {lede && (
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-mute">
                {lede}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
