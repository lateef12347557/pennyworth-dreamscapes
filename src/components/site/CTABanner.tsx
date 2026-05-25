import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function CTABanner() {
  return (
    <section id="contact" className="px-6 py-20 lg:px-10">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-terracotta-gradient px-8 py-20 text-ivory shadow-bloom lg:px-20 lg:py-28">
        <div className="absolute -top-20 -right-10 h-80 w-80 rounded-full bg-ivory/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 h-80 w-80 rounded-full bg-charcoal/15 blur-3xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="small-caps text-xs text-ivory/80">— Let's Talk</span>
            <h2 className="mt-4 font-display text-5xl leading-[1.05] lg:text-7xl">
              Your dream home is <em>one call</em> away.
            </h2>
            <p className="mt-6 max-w-lg text-ivory/85 text-lg leading-relaxed">
              Pour a coffee, tell us what you're looking for, and we'll take it
              from there. No pressure — promise.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col gap-4 lg:items-end"
          >
            <a href="mailto:hello@pennyworth.com" className="group inline-flex items-center justify-center gap-2 rounded-full bg-ivory px-8 py-5 text-base font-medium text-terracotta-deep shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-bloom">
              Get in Touch
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="tel:+15551234567" className="font-display italic text-2xl text-ivory/90 hover:text-ivory">
              or call (555) 123-4567
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
