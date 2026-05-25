import { useState } from "react";
import { motion } from "motion/react";
import { Bath, BedDouble, Maximize, MapPin, ArrowUpRight } from "lucide-react";
import p1 from "@/assets/property-1.jpg";
import p2 from "@/assets/property-2.jpg";
import p3 from "@/assets/property-3.jpg";
import { PropertyDialog, type Property } from "./PropertyDialog";

const properties: Property[] = [
  { img: p1, price: "$2.45M", title: "Casa de Olivo", addr: "Montecito, California", bed: 5, bath: 4, sqft: "4,200" },
  { img: p2, price: "$1.18M", title: "The Willowbrook", addr: "Hudson Valley, New York", bed: 4, bath: 3, sqft: "3,150" },
  { img: p3, price: "$3.92M", title: "Cedar & Glass", addr: "Sausalito, California", bed: 6, bath: 5, sqft: "5,400" },
];

export function FeaturedProperties() {
  const [selected, setSelected] = useState<Property | null>(null);

  return (
    <section id="properties" className="relative px-6 py-28 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="small-caps text-xs text-terracotta"
            >— Featured</motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mt-4 font-display text-5xl text-charcoal lg:text-6xl"
            >
              Homes worth <em className="text-terracotta">falling for</em>
            </motion.h2>
          </div>
          <a href="#properties" className="group inline-flex items-center gap-2 text-sm font-medium text-charcoal hover:text-terracotta">
            View all properties
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelected(p)}
              className="group relative cursor-pointer overflow-hidden rounded-3xl bg-card text-left shadow-card transition-shadow hover:shadow-bloom"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.img} alt={p.title} loading="lazy" width={1200} height={900}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-terracotta/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                <div className="absolute left-5 top-5 rounded-full bg-ivory/95 px-4 py-2 font-display text-lg text-terracotta shadow-soft">
                  {p.price}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl text-charcoal">{p.title}</h3>
                <div className="mt-1 flex items-center gap-1.5 text-sm text-charcoal/60">
                  <MapPin size={14} /> {p.addr}
                </div>
                <div className="mt-5 flex items-center gap-5 text-sm text-charcoal/75">
                  <span className="inline-flex items-center gap-1.5"><BedDouble size={16} className="text-terracotta" />{p.bed}</span>
                  <span className="inline-flex items-center gap-1.5"><Bath size={16} className="text-terracotta" />{p.bath}</span>
                  <span className="inline-flex items-center gap-1.5"><Maximize size={16} className="text-terracotta" />{p.sqft} sqft</span>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-charcoal transition-colors group-hover:text-terracotta">
                  View Property <ArrowUpRight size={14} />
                </span>
              </div>
            </motion.article>
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
