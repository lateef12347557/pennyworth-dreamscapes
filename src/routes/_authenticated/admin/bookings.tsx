import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/bookings")({
  component: BookingsAdmin,
});

type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferred_date: string | null;
  message: string | null;
  status: string;
  created_at: string;
  property_id: string | null;
  properties: { title: string } | null;
};

function BookingsAdmin() {
  const qc = useQueryClient();
  const { data: bookings = [] } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*, properties(title)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as unknown as Booking[];
    },
  });

  const setStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success(`Marked ${status}`);
      qc.invalidateQueries({ queryKey: ["admin-bookings"] });
    }
  };

  return (
    <div>
      <h2 className="font-display text-3xl text-charcoal">Bookings</h2>
      <div className="mt-6 space-y-3">
        {bookings.map((b) => (
          <div key={b.id} className="rounded-2xl bg-card p-5 shadow-card">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="font-display text-xl text-charcoal">{b.name}</div>
                <div className="text-xs text-charcoal/60">
                  {b.email} · {b.phone}
                  {b.preferred_date && ` · ${b.preferred_date}`}
                </div>
                <div className="mt-2 text-sm text-charcoal/75">
                  {b.properties?.title ?? "—"} · <span className="text-xs">{new Date(b.created_at).toLocaleString()}</span>
                </div>
                {b.message && <p className="mt-2 text-sm text-charcoal/70 italic">"{b.message}"</p>}
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-3 py-1 text-xs small-caps ${
                  b.status === "confirmed" ? "bg-sage/20 text-sage" :
                  b.status === "cancelled" ? "bg-charcoal/10 text-charcoal/50" :
                  "bg-terracotta/15 text-terracotta"
                }`}>{b.status}</span>
                <select
                  value={b.status}
                  onChange={(e) => setStatus(b.id, e.target.value)}
                  className="rounded-full border border-charcoal/15 bg-ivory px-3 py-1.5 text-xs"
                >
                  <option value="pending">pending</option>
                  <option value="confirmed">confirmed</option>
                  <option value="cancelled">cancelled</option>
                </select>
              </div>
            </div>
          </div>
        ))}
        {bookings.length === 0 && (
          <div className="rounded-2xl bg-card p-10 text-center text-sm text-charcoal/50 shadow-card">
            No bookings yet.
          </div>
        )}
      </div>
    </div>
  );
}
