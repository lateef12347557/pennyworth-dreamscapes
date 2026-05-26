import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, User, Heart, LogOut, LayoutDashboard } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";

const links = [
  { label: "Home", href: "/#home" },
  { label: "Properties", href: "/#properties" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#how" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const { user, isAdmin, signOut } = useAuth();

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
          scrolled ? "backdrop-blur-xl bg-ivory/70 border-b border-charcoal/5" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link to="/" className="flex items-baseline gap-2">
            <span className="font-display italic text-3xl text-charcoal leading-none">Pennyworth</span>
            <span className="small-caps text-[10px] text-terracotta hidden sm:inline">Real Estate</span>
          </Link>

          <ul className="hidden lg:flex items-center gap-9">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="relative text-sm font-medium text-charcoal/80 transition-colors hover:text-terracotta after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-terracotta after:transition-all hover:after:w-full">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button onClick={() => setMenu(!menu)} className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-charcoal text-ivory">
                  <User size={16} />
                </button>
                <AnimatePresence>
                  {menu && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                      className="absolute right-0 mt-2 w-56 rounded-2xl bg-ivory p-2 shadow-bloom"
                    >
                      <div className="border-b border-charcoal/10 px-3 py-2 text-xs text-charcoal/60 truncate">{user.email}</div>
                      <Link to="/saved" onClick={() => setMenu(false)} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-charcoal hover:bg-peach-light">
                        <Heart size={14} /> Saved homes
                      </Link>
                      {isAdmin && (
                        <Link to="/admin" onClick={() => setMenu(false)} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-charcoal hover:bg-peach-light">
                          <LayoutDashboard size={14} /> Admin
                        </Link>
                      )}
                      <button onClick={() => { setMenu(false); signOut(); }} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-charcoal hover:bg-peach-light">
                        <LogOut size={14} /> Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="text-sm font-medium text-charcoal hover:text-terracotta">
                Sign in
              </Link>
            )}
            <a href="#contact" className="inline-flex items-center rounded-full bg-terracotta px-6 py-3 text-sm font-medium text-ivory shadow-soft transition-all hover:bg-terracotta-deep hover:shadow-bloom hover:-translate-y-0.5">
              Book a Viewing
            </a>
          </div>

          <button onClick={() => setOpen(true)} className="lg:hidden rounded-full bg-charcoal/5 p-2 text-charcoal" aria-label="Open menu">
            <Menu size={22} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-charcoal/40 backdrop-blur-sm lg:hidden" />
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
                    <a href={l.href} onClick={() => setOpen(false)} className="font-display text-3xl text-charcoal transition-colors hover:text-terracotta">
                      {l.label}
                    </a>
                  </li>
                ))}
                {user ? (
                  <>
                    <li><Link to="/saved" onClick={() => setOpen(false)} className="font-display text-3xl text-charcoal">Saved</Link></li>
                    {isAdmin && <li><Link to="/admin" onClick={() => setOpen(false)} className="font-display text-3xl text-charcoal">Admin</Link></li>}
                    <li><button onClick={() => { setOpen(false); signOut(); }} className="font-display text-3xl text-charcoal">Sign out</button></li>
                  </>
                ) : (
                  <li><Link to="/login" onClick={() => setOpen(false)} className="font-display text-3xl text-charcoal">Sign in</Link></li>
                )}
              </ul>
              <a href="#contact" onClick={() => setOpen(false)} className="mt-10 inline-flex w-full items-center justify-center rounded-full bg-terracotta px-6 py-4 text-sm font-medium text-ivory">
                Book a Viewing
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
