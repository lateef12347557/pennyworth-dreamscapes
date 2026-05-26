import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Building2, CalendarCheck, Heart, Eye } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Overview,
});

function Stat({ label, value, icon: Icon }: { label: string; value: number; icon: React.ComponentType<{ size?: number; className?: string }> }) {
  return (
    <div className="rounded-3xl bg-card p-6 shadow-card">
      <Icon size={20} className="text-terracotta" />
      <div className="mt-4 font-display text-4xl text-charcoal">{value}</div>
      <div className="mt-1 text-xs small-caps text-charcoal/60">{label}</div>
    </div>
  );
}

function Overview() {
  const { data } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: async () => {
      const [props, books, likes, views] = await Promise.all([
        supabase.from("properties").select("id", { count: "exact", head: true }),
        supabase.from("bookings").select("id", { count: "exact", head: true }),
        supabase.from("property_likes").select("id", { count: "exact", head: true }),
        supabase.from("property_views").select("id", { count: "exact", head: true }),
      ]);
      return {
        properties: props.count ?? 0,
        bookings: books.count ?? 0,
        likes: likes.count ?? 0,
        views: views.count ?? 0,
      };
    },
  });

  return (
    <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
      <Stat label="Properties" value={data?.properties ?? 0} icon={Building2} />
      <Stat label="Bookings" value={data?.bookings ?? 0} icon={CalendarCheck} />
      <Stat label="Likes" value={data?.likes ?? 0} icon={Heart} />
      <Stat label="Views" value={data?.views ?? 0} icon={Eye} />
    </div>
  );
}
