import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Bath, BedDouble, Maximize, MapPin, X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export type Property = {
  img: string;
  price: string;
  title: string;
  addr: string;
  bed?: number;
  bath?: number;
  sqft?: string;
};

export function PropertyDialog({
  property,
  open,
  onOpenChange,
}: {
  property: Property | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [zoom, setZoom] = useState(false);

  if (!property) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl overflow-hidden border-0 bg-ivory p-0">
          <DialogTitle className="sr-only">{property.title}</DialogTitle>
          <DialogDescription className="sr-only">{property.addr}</DialogDescription>
          <div className="grid md:grid-cols-2">
            <button
              type="button"
              onClick={() => setZoom(true)}
              className="group relative aspect-[4/3] overflow-hidden md:aspect-auto md:h-full"
            >
              <img
                src={property.img}
                alt={property.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-charcoal/0 transition-colors group-hover:bg-charcoal/30">
                <span className="flex items-center gap-2 rounded-full bg-ivory/95 px-4 py-2 text-xs font-medium text-charcoal opacity-0 shadow-soft transition-opacity group-hover:opacity-100">
                  <ZoomIn size={14} /> View full image
                </span>
              </div>
              <div className="absolute left-5 top-5 rounded-full bg-ivory/95 px-4 py-2 font-display text-lg text-terracotta shadow-soft">
                {property.price}
              </div>
            </button>

            <div className="p-8 lg:p-10">
              <span className="small-caps text-xs text-terracotta">— Featured Home</span>
              <h3 className="mt-3 font-display text-4xl text-charcoal">{property.title}</h3>
              <div className="mt-2 flex items-center gap-1.5 text-sm text-charcoal/60">
                <MapPin size={14} /> {property.addr}
              </div>

              {(property.bed || property.bath || property.sqft) && (
                <div className="mt-6 flex flex-wrap gap-5 border-y border-charcoal/10 py-5 text-sm text-charcoal/80">
                  {property.bed && (
                    <span className="inline-flex items-center gap-1.5"><BedDouble size={16} className="text-terracotta" />{property.bed} Beds</span>
                  )}
                  {property.bath && (
                    <span className="inline-flex items-center gap-1.5"><Bath size={16} className="text-terracotta" />{property.bath} Baths</span>
                  )}
                  {property.sqft && (
                    <span className="inline-flex items-center gap-1.5"><Maximize size={16} className="text-terracotta" />{property.sqft} sqft</span>
                  )}
                </div>
              )}

              <p className="mt-5 text-sm leading-relaxed text-charcoal/70">
                A thoughtfully curated home where light, warmth, and craft come together. Our team would love to
                walk you through this property in person — schedule a private tour at your convenience.
              </p>

              <a
                href="#contact"
                onClick={() => onOpenChange(false)}
                className="mt-7 inline-flex items-center justify-center rounded-full bg-terracotta px-6 py-3 text-sm font-medium text-ivory shadow-soft transition-all hover:bg-terracotta-deep hover:shadow-bloom"
              >
                Schedule a private tour
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AnimatePresence>
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/95 p-4 backdrop-blur-sm"
          >
            <button
              onClick={() => setZoom(false)}
              className="absolute right-6 top-6 rounded-full bg-ivory/10 p-2 text-ivory transition-colors hover:bg-ivory/20"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              src={property.img}
              alt={property.title}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] max-w-[95vw] rounded-2xl object-contain shadow-bloom"
            />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-ivory/95 px-5 py-2 font-display text-charcoal shadow-bloom">
              {property.title} <span className="text-terracotta">· {property.price}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
