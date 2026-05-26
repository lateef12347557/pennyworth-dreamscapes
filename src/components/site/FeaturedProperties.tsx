import { useState } from "react";
import { motion } from "motion/react";
import { Bath, BedDouble, Maximize, MapPin, ArrowUpRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PropertyDialog } from "./PropertyDialog";
import { resolveImg, type Property } from "@/lib/properties";
import { LikeButton } from "./LikeButton";

export function FeaturedProperties() {
  const [selected, setSelected] = useState<Property | null>(null);
  const { data: properties = [] } = useQuery({
    queryKey: ["properties", "featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("featured", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Property[];
    },
  });

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
              key={p.id}
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
                  src={resolveImg(p.image_url)} alt={p.title} loading="lazy" width={1200} height={900}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
                <div className="absolute left-5 top-5 rounded-full bg-ivory/95 px-4 py-2 font-display text-lg text-terracotta shadow-soft">
                  {p.price}
                </div>
                <div className="absolute right-4 top-4">
                  <LikeButton propertyId={p.id} />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl text-charcoal">{p.title}</h3>
                <div className="mt-1 flex items-center gap-1.5 text-sm text-charcoal/60">
                  <MapPin size={14} /> {p.address}
                </div>
                <div className="mt-5 flex items-center gap-5 text-sm text-charcoal/75">
                  {p.bed != null && <span className="inline-flex items-center gap-1.5"><BedDouble size={16} className="text-terracotta" />{p.bed}</span>}
                  {p.bath != null && <span className="inline-flex items-center gap-1.5"><Bath size={16} className="text-terracotta" />{p.bath}</span>}
                  {p.sqft && <span className="inline-flex items-center gap-1.5"><Maximize size={16} className="text-terracotta" />{p.sqft} sqft</span>}
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
