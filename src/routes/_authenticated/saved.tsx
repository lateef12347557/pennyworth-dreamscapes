import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { resolveImg, type Property } from "@/lib/properties";
import { MapPin, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/_authenticated/saved")({
  component: SavedPage,
  head: () => ({ meta: [{ title: "Saved homes — Pennyworth" }] }),
});

function SavedPage() {
  const { user } = useAuth();
  const { data: properties = [] } = useQuery({
    queryKey: ["my-likes", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("property_likes")
        .select("properties(*)")
        .eq("user_id", user!.id);
      if (error) throw error;
      return (data ?? []).map((d) => d.properties).filter(Boolean) as unknown as Property[];
    },
  });

  return (
    <main className="min-h-screen bg-ivory grain">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-charcoal/70 hover:text-terracotta">
          <ArrowLeft size={16} /> Back home
        </Link>
        <h1 className="mt-6 font-display text-5xl text-charcoal">Your saved homes</h1>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => (
            <Link key={p.id} to="/book/$id" params={{ id: p.id }} className="group overflow-hidden rounded-3xl bg-card shadow-card">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={resolveImg(p.image_url)} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-2xl text-charcoal">{p.title}</h3>
                <div className="mt-1 flex items-center gap-1.5 text-sm text-charcoal/60">
                  <MapPin size={14} /> {p.address}
                </div>
                <div className="mt-3 font-display text-terracotta">{p.price}</div>
              </div>
            </Link>
          ))}
          {properties.length === 0 && (
            <p className="col-span-full text-center text-charcoal/50 py-20">No saved homes yet. Tap the heart on any listing.</p>
          )}
        </div>
      </div>
    </main>
  );
}
