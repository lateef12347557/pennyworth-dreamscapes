import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Properties", href: "#properties" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#how" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl bg-ivory/70 border-b border-charcoal/5"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <a href="#home" className="flex items-baseline gap-2">
            <span className="font-display italic text-3xl text-charcoal leading-none">Pennyworth</span>
            <span className="small-caps text-[10px] text-terracotta hidden sm:inline">Real Estate</span>
          </a>

          <ul className="hidden lg:flex items-center gap-9">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative text-sm font-medium text-charcoal/80 transition-colors hover:text-terracotta after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-terracotta after:transition-all hover:after:w-full"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden lg:inline-flex items-center rounded-full bg-terracotta px-6 py-3 text-sm font-medium text-ivory shadow-soft transition-all hover:bg-terracotta-deep hover:shadow-bloom hover:-translate-y-0.5"
          >
            Book a Viewing
          </a>

          <button
            onClick={() => setOpen(true)}
            className="lg:hidden rounded-full bg-charcoal/5 p-2 text-charcoal"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-charcoal/40 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
              className="fixed right-0 top-0 z-[70] h-full w-[82%] max-w-sm bg-ivory p-8 shadow-bloom lg:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="font-display italic text-2xl">Pennyworth</span>
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="rounded-full p-2 hover:bg-peach-light">
                  <X size={20} />
                </button>
              </div>
              <ul className="mt-12 space-y-6">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="font-display text-3xl text-charcoal transition-colors hover:text-terracotta"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-10 inline-flex w-full items-center justify-center rounded-full bg-terracotta px-6 py-4 text-sm font-medium text-ivory"
              >
                Book a Viewing
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
