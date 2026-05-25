import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroImg from "@/assets/hero-interior.jpg";

const stats = [
  { value: "1,200+", label: "Homes Sold" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "15", label: "Years of Craft" },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative min-h-screen overflow-hidden bg-hero-warm grain">
      <motion.div style={{ y }} className="absolute inset-0 -z-0">
        <div className="absolute inset-0 bg-hero-warm" />
        <div className="absolute -right-20 top-32 h-[520px] w-[520px] rounded-full bg-terracotta/15 blur-3xl" />
        <div className="absolute -left-20 bottom-10 h-[420px] w-[420px] rounded-full bg-sage/15 blur-3xl" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 pt-40 pb-24 lg:px-10 lg:pt-44">
        <motion.span
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
          className="small-caps text-xs text-terracotta"
        >
          — Boutique Real Estate, Est. 2010
        </motion.span>

        <h1 className="mt-6 font-display text-[64px] leading-[0.95] sm:text-[88px] lg:text-[120px]">
          {["Find", "Your"].map((w, i) => (
            <motion.span key={w} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.1, duration: 0.9, ease: "easeOut" }}
              className="mr-5 inline-block text-charcoal"
            >{w}</motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.9, ease: "easeOut" }}
            className="mr-5 inline-block italic text-terracotta"
          >Forever</motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.9, ease: "easeOut" }}
            className="inline-block text-charcoal"
          >Home.</motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-8 max-w-xl text-lg text-charcoal/70 leading-relaxed"
        >
          A boutique team curating warm, well-loved homes for the people who'll
          love them next. No pressure, no jargon — just the right key, in the right hand.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a href="#properties" className="group inline-flex items-center gap-2 rounded-full bg-charcoal px-7 py-4 text-sm font-medium text-ivory shadow-soft transition-all hover:bg-terracotta hover:shadow-bloom hover:-translate-y-0.5">
            Explore Properties
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#how" className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-ivory/40 px-7 py-4 text-sm font-medium text-charcoal backdrop-blur transition-all hover:border-terracotta hover:text-terracotta">
            How It Works
          </a>
        </motion.div>

        <div className="mt-16 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.25 + i * 0.1, duration: 0.7 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-charcoal/10 bg-ivory/60 px-6 py-5 backdrop-blur-md shadow-soft"
            >
              <div className="font-display text-4xl text-terracotta">{s.value}</div>
              <div className="mt-1 small-caps text-[11px] text-charcoal/70">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.img
        initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 1.4 }}
        src={heroImg}
        alt="Warm sunlit living room"
        width={1600} height={1200}
        className="pointer-events-none absolute -bottom-12 right-[-8%] z-0 hidden h-[58vh] w-[52vw] rounded-3xl object-cover shadow-bloom lg:block"
      />

      <motion.a
        href="#properties"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-charcoal/60"
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </motion.a>
    </section>
  );
}
