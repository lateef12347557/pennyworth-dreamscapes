import { motion } from "motion/react";
import { Quote, Star } from "lucide-react";

const items = [
  { name: "Eleanor & James W.", role: "Bought in Montecito", text: "They listened more than they talked — and then handed us the keys to a house that feels like it was always ours." },
  { name: "Priya N.", role: "Sold in 11 days", text: "Pennyworth made the most stressful thing in our lives feel like a really lovely Sunday brunch. I'm not joking." },
  { name: "Marcus T.", role: "First-time buyer", text: "I had a hundred questions and one tiny budget. They treated both like they mattered. Because to them, they did." },
  { name: "The Holloway Family", role: "Bought in Hudson Valley", text: "We toured nine homes. They knew on the third that #7 was ours. They were right. We've been here four years." },
  { name: "Sofia & Daniel L.", role: "Investment portfolio", text: "Professional like a boutique law firm, warm like the family doctor. Rare combination." },
];

export function Testimonials() {
  const loop = [...items, ...items];
  return (
    <section className="relative overflow-hidden bg-ivory-warm grain py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="small-caps text-xs text-terracotta">— Kind Words</motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-4 font-display text-5xl text-charcoal lg:text-6xl"
          >
            From the people who <em className="text-terracotta">stayed</em>.
          </motion.h2>
        </div>
      </div>

      <div className="relative mt-16 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          {loop.map((t, i) => (
            <article key={i} className="w-[360px] shrink-0 rounded-3xl bg-card p-8 shadow-card">
              <Quote size={28} className="text-terracotta" />
              <p className="mt-4 font-display text-xl italic text-charcoal/85 leading-snug">"{t.text}"</p>
              <div className="mt-6 flex items-center justify-between border-t border-charcoal/10 pt-5">
                <div>
                  <div className="text-sm font-semibold text-charcoal">{t.name}</div>
                  <div className="text-xs text-charcoal/55">{t.role}</div>
                </div>
                <div className="flex gap-0.5 text-terracotta">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} size={13} fill="currentColor" />)}
                </div>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
