import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { resolveImg, type Property } from "@/lib/properties";
import { toast } from "sonner";
import { ArrowLeft, MapPin, BedDouble, Bath, Maximize } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/book/$id")({
  component: BookingPage,
  head: () => ({ meta: [{ title: "Book a viewing — Pennyworth" }] }),
});

function BookingPage() {
  const { id } = Route.useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: user?.email ?? "",
    phone: "",
    preferred_date: "",
    message: "",
  });
  const [busy, setBusy] = useState(false);

  const { data: property } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("properties").select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      return data as Property | null;
    },
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.from("bookings").insert({
      property_id: id,
      user_id: user?.id ?? null,
      name: form.name,
      email: form.email,
      phone: form.phone,
      preferred_date: form.preferred_date || null,
      message: form.message || null,
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Booking received — we'll be in touch shortly");
      navigate({ to: "/" });
    }
  };

  return (
    <main className="min-h-screen bg-ivory grain">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-10">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-charcoal/70 hover:text-terracotta">
          <ArrowLeft size={16} /> Back home
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="small-caps text-xs text-terracotta">— Book a private viewing</span>
            <h1 className="mt-3 font-display text-5xl text-charcoal">
              {property ? property.title : "Schedule a tour"}
            </h1>
            {property && (
              <>
                <div className="mt-3 flex items-center gap-1.5 text-sm text-charcoal/60">
                  <MapPin size={14} /> {property.address}
                </div>
                <div className="mt-6 overflow-hidden rounded-3xl shadow-card">
                  <img src={resolveImg(property.image_url)} alt={property.title} className="aspect-[4/3] w-full object-cover" />
                </div>
                <div className="mt-5 flex flex-wrap gap-5 text-sm text-charcoal/80">
                  <span className="font-display text-2xl text-terracotta">{property.price}</span>
                  {property.bed && <span className="inline-flex items-center gap-1.5"><BedDouble size={16} className="text-terracotta" />{property.bed} Beds</span>}
                  {property.bath && <span className="inline-flex items-center gap-1.5"><Bath size={16} className="text-terracotta" />{property.bath} Baths</span>}
                  {property.sqft && <span className="inline-flex items-center gap-1.5"><Maximize size={16} className="text-terracotta" />{property.sqft} sqft</span>}
                </div>
              </>
            )}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            onSubmit={submit}
            className="rounded-3xl bg-card p-8 shadow-bloom lg:p-10 space-y-4 h-fit"
          >
            <h2 className="font-display text-2xl text-charcoal">Your details</h2>
            <div>
              <label className="text-xs small-caps text-charcoal/60">Full name</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full rounded-xl border border-charcoal/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-terracotta" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs small-caps text-charcoal/60">Email</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-charcoal/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-terracotta" />
              </div>
              <div>
                <label className="text-xs small-caps text-charcoal/60">Phone</label>
                <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-charcoal/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-terracotta" />
              </div>
            </div>
            <div>
              <label className="text-xs small-caps text-charcoal/60">Preferred date</label>
              <input type="date" value={form.preferred_date} onChange={(e) => setForm({ ...form, preferred_date: e.target.value })}
                className="mt-1 w-full rounded-xl border border-charcoal/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-terracotta" />
            </div>
            <div>
              <label className="text-xs small-caps text-charcoal/60">Message (optional)</label>
              <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-1 w-full rounded-xl border border-charcoal/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-terracotta" />
            </div>
            <button type="submit" disabled={busy}
              className="w-full rounded-full bg-terracotta px-6 py-3.5 text-sm font-medium text-ivory shadow-soft transition-all hover:shadow-bloom disabled:opacity-60">
              {busy ? "Sending…" : "Request viewing"}
            </button>
            <p className="text-xs text-charcoal/50 text-center">A Pennyworth advisor will reach out within 24 hours.</p>
          </motion.form>
        </div>
      </div>
    </main>
  );
}
