import { useState } from "react";
import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PropertyDialog } from "./PropertyDialog";
import { resolveImg, type Property } from "@/lib/properties";
import { LikeButton } from "./LikeButton";

export function LatestListings() {
  const [selected, setSelected] = useState<Property | null>(null);
  const { data: listings = [] } = useQuery({
    queryKey: ["properties", "latest"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(8);
      if (error) throw error;
      return data as Property[];
    },
  });

  if (listings.length === 0) return null;

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
              key={l.id}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative w-[280px] shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-card text-left shadow-card transition-shadow hover:shadow-bloom md:w-auto"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={resolveImg(l.image_url)} alt={l.title} loading="lazy" width={600} height={750}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                {l.featured && (
                  <span className="absolute left-4 top-4 small-caps text-[10px] rounded-full px-3 py-1 text-ivory bg-terracotta">
                    Featured
                  </span>
                )}
                <div className="absolute right-3 top-3">
                  <LikeButton propertyId={l.id} />
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-xl text-charcoal">{l.title}</h3>
                  <span className="font-display text-lg text-terracotta">{l.price}</span>
                </div>
                <div className="mt-1 flex items-center gap-1 text-xs text-charcoal/60">
                  <MapPin size={12} /> {l.address}
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
