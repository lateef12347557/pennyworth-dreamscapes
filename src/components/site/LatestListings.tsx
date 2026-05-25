import { useState } from "react";
import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import p1 from "@/assets/property-1.jpg";
import p2 from "@/assets/property-2.jpg";
import p3 from "@/assets/property-3.jpg";
import { PropertyDialog, type Property } from "./PropertyDialog";

type Listing = Property & { badge: string; tone: "terracotta" | "sage" };

const listings: Listing[] = [
  { img: p2, badge: "New", tone: "terracotta", title: "Magnolia Cottage", price: "$845K", addr: "Asheville, NC", bed: 3, bath: 2, sqft: "1,800" },
  { img: p3, badge: "Hot", tone: "sage", title: "The Ridgeway", price: "$2.1M", addr: "Sausalito, CA", bed: 4, bath: 3, sqft: "3,400" },
  { img: p1, badge: "New", tone: "terracotta", title: "Villa Sereno", price: "$3.4M", addr: "Ojai, CA", bed: 5, bath: 4, sqft: "4,600" },
  { img: p2, badge: "Open", tone: "sage", title: "Birchwood Lane", price: "$1.05M", addr: "Hudson, NY", bed: 3, bath: 2, sqft: "2,100" },
];

export function LatestListings() {
  const [selected, setSelected] = useState<Property | null>(null);

  return (
    <section className="px-6 py-28 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="small-caps text-xs text-terracotta">— Just Listed</span>
            <h2 className="mt-4 font-display text-5xl text-charcoal lg:text-6xl">
              Fresh on the <em className="text-terracotta">market</em>
            </h2>
          </div>
        </div>

        <div className="mt-12 -mx-6 flex gap-5 overflow-x-auto px-6 pb-4 md:mx-0 md:grid md:grid-cols-2 md:px-0 md:pb-0 lg:grid-cols-4">
          {listings.map((l, i) => (
            <motion.button
              type="button"
              onClick={() => setSelected(l)}
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative w-[280px] shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-card text-left shadow-card transition-shadow hover:shadow-bloom md:w-auto"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={l.img} alt={l.title} loading="lazy" width={600} height={750}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <span className={`absolute left-4 top-4 small-caps text-[10px] rounded-full px-3 py-1 text-ivory ${l.tone === "terracotta" ? "bg-terracotta" : "bg-sage"}`}>
                  {l.badge}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-xl text-charcoal">{l.title}</h3>
                  <span className="font-display text-lg text-terracotta">{l.price}</span>
                </div>
                <div className="mt-1 flex items-center gap-1 text-xs text-charcoal/60">
                  <MapPin size={12} /> {l.addr}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <PropertyDialog
        property={selected}
        open={!!selected}
        onOpenChange={(v) => !v && setSelected(null)}
      />
    </section>
  );
}
