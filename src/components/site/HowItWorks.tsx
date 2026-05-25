import { motion } from "motion/react";
import { MessageCircleHeart, Search, KeyRound } from "lucide-react";

const steps = [
  { icon: MessageCircleHeart, n: "01", title: "Tell Us Your Dream", text: "A relaxed conversation about the life you want to live — neighborhood, light, mornings, all of it." },
  { icon: Search, n: "02", title: "We Find the Match", text: "Our team curates a shortlist of homes worth your weekend, including off-market gems." },
  { icon: KeyRound, n: "03", title: "You Move In Happy", text: "We negotiate, coordinate, and hand you the keys — plus a bottle of something good." },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative overflow-hidden bg-sage px-6 py-28 text-ivory lg:px-10 lg:py-36">
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-sage-deep/40 blur-3xl" />
      <div className="absolute -left-32 -bottom-32 h-96 w-96 rounded-full bg-terracotta/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="small-caps text-xs text-ivory/80">— The Process</motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mx-auto mt-4 max-w-2xl font-display text-5xl lg:text-6xl"
          >
            Three steps to <em>home</em>.
          </motion.h2>
        </div>

        <div className="relative mt-20 grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="absolute left-0 right-0 top-10 hidden h-px bg-ivory/25 md:block" />
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="relative text-center"
            >
              <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-ivory text-terracotta shadow-bloom">
                <s.icon size={28} />
              </div>
              <div className="mt-6 font-display italic text-sm text-ivory/70">{s.n}</div>
              <h3 className="mt-2 font-display text-3xl">{s.title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-sm text-ivory/80 leading-relaxed">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
