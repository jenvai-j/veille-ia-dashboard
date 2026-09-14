import { Frame } from "@/components/ui/Frame";
import { photo } from "@/data/photos";

export function Gallery({ slots }: { slots: string[] }) {
  return (
    <div className="-mx-5 sm:-mx-8">
      <div className="snap-row flex gap-3 overflow-x-auto px-5 pb-2 sm:px-8">
        {slots.map((id) => {
          const p = photo(id);
          return (
            <figure
              key={id}
              className="snap-item w-[78vw] shrink-0 sm:w-[340px]"
            >
              <Frame
                slot={id}
                scrim="soft"
                className="h-[240px] w-full rounded-2xl sm:h-[260px]"
              />
              <figcaption className="mt-2 px-1 text-[12px] leading-snug text-mute">
                {p.subject}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
