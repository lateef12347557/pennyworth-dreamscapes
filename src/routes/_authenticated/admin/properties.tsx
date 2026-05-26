import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Trash2, Star } from "lucide-react";
import type { Property } from "@/lib/properties";

export const Route = createFileRoute("/_authenticated/admin/properties")({
  component: PropertiesAdmin,
});

const blank = {
  title: "", address: "", price: "", bed: "", bath: "", sqft: "",
  description: "", image_url: "", featured: false,
};

function PropertiesAdmin() {
  const qc = useQueryClient();
  const [form, setForm] = useState(blank);
  const [open, setOpen] = useState(false);

  const { data: properties = [] } = useQuery({
    queryKey: ["admin-properties"],
    queryFn: async () => {
      const { data, error } = await supabase.from("properties").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Property[];
    },
  });

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("properties").insert({
      title: form.title,
      address: form.address,
      price: form.price,
      bed: form.bed ? Number(form.bed) : null,
      bath: form.bath ? Number(form.bath) : null,
      sqft: form.sqft || null,
      description: form.description || null,
      image_url: form.image_url,
      featured: form.featured,
    });
    if (error) toast.error(error.message);
    else {
      toast.success("Property added");
      setForm(blank);
      setOpen(false);
      qc.invalidateQueries({ queryKey: ["admin-properties"] });
      qc.invalidateQueries({ queryKey: ["properties"] });
    }
  };

  const del = async (id: string) => {
    if (!confirm("Delete this property?")) return;
    const { error } = await supabase.from("properties").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["admin-properties"] });
      qc.invalidateQueries({ queryKey: ["properties"] });
    }
  };

  const toggleFeatured = async (p: Property) => {
    await supabase.from("properties").update({ featured: !p.featured }).eq("id", p.id);
    qc.invalidateQueries({ queryKey: ["admin-properties"] });
    qc.invalidateQueries({ queryKey: ["properties"] });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-3xl text-charcoal">Properties</h2>
        <button onClick={() => setOpen(!open)} className="inline-flex items-center gap-2 rounded-full bg-terracotta px-5 py-2.5 text-sm text-ivory shadow-soft hover:shadow-bloom">
          <Plus size={16} /> New property
        </button>
      </div>

      {open && (
        <form onSubmit={save} className="mt-6 grid grid-cols-1 gap-4 rounded-3xl bg-card p-6 shadow-card sm:grid-cols-2">
          {[
            ["title", "Title"], ["address", "Address"], ["price", "Price (e.g. $2.4M)"],
            ["image_url", "Image URL"], ["bed", "Bedrooms"], ["bath", "Bathrooms"], ["sqft", "Sqft"],
          ].map(([k, label]) => (
            <div key={k}>
              <label className="text-xs small-caps text-charcoal/60">{label}</label>
              <input
                required={["title", "address", "price", "image_url"].includes(k)}
                value={(form as Record<string, string | boolean>)[k] as string}
                onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                className="mt-1 w-full rounded-xl border border-charcoal/15 bg-ivory px-3 py-2.5 text-sm outline-none focus:border-terracotta"
              />
            </div>
          ))}
          <div className="sm:col-span-2">
            <label className="text-xs small-caps text-charcoal/60">Description</label>
            <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="mt-1 w-full rounded-xl border border-charcoal/15 bg-ivory px-3 py-2.5 text-sm outline-none focus:border-terracotta" />
          </div>
          <label className="inline-flex items-center gap-2 text-sm text-charcoal/80">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
            Featured
          </label>
          <div className="sm:col-span-2 flex justify-end">
            <button className="rounded-full bg-charcoal px-6 py-2.5 text-sm text-ivory">Save</button>
          </div>
        </form>
      )}

      <div className="mt-6 overflow-hidden rounded-3xl bg-card shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-peach-light/50 text-left text-xs small-caps text-charcoal/70">
            <tr>
              <th className="px-5 py-3">Property</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Featured</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p) => (
              <tr key={p.id} className="border-t border-charcoal/5">
                <td className="px-5 py-3">
                  <div className="font-medium text-charcoal">{p.title}</div>
                  <div className="text-xs text-charcoal/60">{p.address}</div>
                </td>
                <td className="px-5 py-3 text-terracotta font-display">{p.price}</td>
                <td className="px-5 py-3">
                  <button onClick={() => toggleFeatured(p)} aria-label="Toggle featured">
                    <Star size={16} className={p.featured ? "fill-terracotta text-terracotta" : "text-charcoal/30"} />
                  </button>
                </td>
                <td className="px-5 py-3 text-right">
                  <button onClick={() => del(p.id)} className="text-charcoal/50 hover:text-terracotta">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {properties.length === 0 && (
              <tr><td colSpan={4} className="px-5 py-10 text-center text-sm text-charcoal/50">No properties yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
