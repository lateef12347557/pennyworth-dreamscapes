import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";

const PHONE = "2348066912469"; // 0806 691 2469 with NG country code

export function WhatsAppButton() {
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(
    "Hi Pennyworth, I'd like to know more about a property."
  )}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", damping: 14 }}
      className="fixed bottom-6 right-6 z-[80] group"
    >
      {/* Pulse rings */}
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/60" />
      <span className="absolute inset-0 -z-10 animate-pulse rounded-full bg-[#25D366]/30 scale-150" />

      <motion.span
        whileHover={{ scale: 1.1, rotate: -8 }}
        whileTap={{ scale: 0.92 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-bloom"
      >
        <MessageCircle size={26} fill="currentColor" strokeWidth={0} />
      </motion.span>

      <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full bg-charcoal px-4 py-2 text-xs font-medium text-ivory opacity-0 shadow-soft transition-opacity group-hover:opacity-100">
        Chat with us on WhatsApp
      </span>
    </motion.a>
  );
}
