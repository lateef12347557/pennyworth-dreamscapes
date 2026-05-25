import { Instagram, Facebook, Linkedin, Twitter, Heart } from "lucide-react";

const cols = [
  { title: "Quick Links", links: ["Home", "Properties", "About", "Contact"] },
  { title: "Services", links: ["Buying", "Selling", "Investment", "Concierge"] },
  { title: "Contact", links: ["123 Olive Lane, Ojai CA", "hello@pennyworth.com", "(555) 123-4567"] },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display italic text-4xl">Pennyworth</span>
              <span className="small-caps text-[10px] text-terracotta">Real Estate</span>
            </div>
            <p className="mt-5 max-w-xs text-sm text-ivory/65 leading-relaxed">
              A boutique team curating warm, well-loved homes for the people
              who'll love them next.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" aria-label="social" className="grid h-10 w-10 place-items-center rounded-full border border-ivory/15 transition-all hover:border-terracotta hover:bg-terracotta hover:text-ivory">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="small-caps text-xs text-terracotta">{c.title}</h4>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-ivory/75 transition-colors hover:text-ivory">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-ivory/10 pt-8 text-xs text-ivory/55 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Pennyworth Real Estate. All rights reserved.</span>
          <span className="inline-flex items-center gap-1.5">
            Built with <Heart size={12} className="fill-terracotta text-terracotta" /> by Pennyworth
          </span>
        </div>
      </div>
    </footer>
  );
}
