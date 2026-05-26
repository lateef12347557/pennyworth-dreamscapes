import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Heart, Eye } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/likes")({
  component: LikesAdmin,
});

type Row = { id: string; title: string; likes: number; views: number };

function LikesAdmin() {
  const { data = [] } = useQuery({
    queryKey: ["admin-engagement"],
    queryFn: async () => {
      const { data: props } = await supabase.from("properties").select("id, title");
      const { data: likes } = await supabase.from("property_likes").select("property_id");
      const { data: views } = await supabase.from("property_views").select("property_id");

      const likeMap = new Map<string, number>();
      likes?.forEach((l) => likeMap.set(l.property_id, (likeMap.get(l.property_id) ?? 0) + 1));
      const viewMap = new Map<string, number>();
      views?.forEach((v) => viewMap.set(v.property_id, (viewMap.get(v.property_id) ?? 0) + 1));

      return (props ?? [])
        .map((p) => ({ id: p.id, title: p.title, likes: likeMap.get(p.id) ?? 0, views: viewMap.get(p.id) ?? 0 }))
        .sort((a, b) => b.likes - a.likes) as Row[];
    },
  });

  return (
    <div>
      <h2 className="font-display text-3xl text-charcoal">Engagement</h2>
      <div className="mt-6 overflow-hidden rounded-3xl bg-card shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-peach-light/50 text-left text-xs small-caps text-charcoal/70">
            <tr>
              <th className="px-5 py-3">Property</th>
              <th className="px-5 py-3 text-right"><Heart size={14} className="inline" /> Likes</th>
              <th className="px-5 py-3 text-right"><Eye size={14} className="inline" /> Views</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r) => (
              <tr key={r.id} className="border-t border-charcoal/5">
                <td className="px-5 py-3 font-medium text-charcoal">{r.title}</td>
                <td className="px-5 py-3 text-right text-terracotta font-display text-lg">{r.likes}</td>
                <td className="px-5 py-3 text-right text-charcoal font-display text-lg">{r.views}</td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr><td colSpan={3} className="px-5 py-10 text-center text-charcoal/50">No data yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
