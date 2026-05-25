import { motion } from "motion/react";
import { ShieldCheck, Sparkles, HeartHandshake, TrendingUp } from "lucide-react";
import { Counter } from "./Counter";
import lifestyle from "@/assets/lifestyle.jpg";

const features = [
  { icon: ShieldCheck, title: "Trusted Experts", text: "Fifteen years of curated transactions and zero shortcuts." },
  { icon: Sparkles, title: "Transparent Process", text: "Honest pricing, clear timelines, and updates you actually want to read." },
  { icon: HeartHandshake, title: "Warm & Personal", text: "We learn your story before we show you a single front door." },
  { icon: TrendingUp, title: "Market-Leading Results", text: "Listings sell 23% faster, on average, with Pennyworth." },
];

export function WhyPennyworth() {
  return (
    <section id="about" className="relative bg-mesh-warm px-6 py-28 lg:px-10 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[2rem] shadow-bloom">
            <img src={lifestyle} alt="Warm kitchen lifestyle" loading="lazy" width={1200} height={1500}
              className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-ivory p-5 shadow-soft md:block">
            <div className="font-display text-4xl text-terracotta"><Counter to={1200} suffix="+" /></div>
            <div className="small-caps text-[10px] text-charcoal/70">Homes Placed</div>
          </div>
          <div className="absolute -top-6 -left-4 hidden rounded-2xl bg-sage p-5 text-ivory shadow-soft md:block">
            <div className="font-display text-4xl"><Counter to={15} /></div>
            <div className="small-caps text-[10px] opacity-80">Years of Craft</div>
          </div>
        </motion.div>

        <div className="lg:pt-8">
          <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="small-caps text-xs text-terracotta">— Why Pennyworth</motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-4 font-display text-5xl text-charcoal lg:text-6xl"
          >
            A different kind of <em className="text-terracotta">real estate</em>.
          </motion.h2>
          <p className="mt-6 max-w-lg text-lg text-charcoal/70 leading-relaxed">
            We're a small team that treats every home like the one we'd want
            our family to come home to. No assembly-line listings — just careful,
            patient matchmaking.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-2xl border border-charcoal/10 bg-ivory/70 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:bg-ivory hover:shadow-soft"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-terracotta/12 text-terracotta">
                  <f.icon size={20} />
                </div>
                <h3 className="mt-4 font-display text-2xl text-charcoal">{f.title}</h3>
                <p className="mt-2 text-sm text-charcoal/65 leading-relaxed">{f.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 flex gap-10 border-t border-charcoal/10 pt-8">
            <div>
              <div className="font-display text-4xl text-terracotta"><Counter to={98} suffix="%" /></div>
              <div className="small-caps text-[10px] text-charcoal/65 mt-1">Happy Clients</div>
            </div>
            <div>
              <div className="font-display text-4xl text-terracotta"><Counter to={340} /></div>
              <div className="small-caps text-[10px] text-charcoal/65 mt-1">Sold This Year</div>
            </div>
            <div>
              <div className="font-display text-4xl text-terracotta"><Counter to={23} suffix="d" /></div>
              <div className="small-caps text-[10px] text-charcoal/65 mt-1">Avg. Days on Market</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
