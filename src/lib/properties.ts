import p1 from "@/assets/property-1.jpg";
import p2 from "@/assets/property-2.jpg";
import p3 from "@/assets/property-3.jpg";

export type Property = {
  id: string;
  title: string;
  address: string;
  price: string;
  bed: number | null;
  bath: number | null;
  sqft: string | null;
  description: string | null;
  image_url: string;
  featured: boolean;
  status: string;
};

const ASSET_MAP: Record<string, string> = {
  "/src/assets/property-1.jpg": p1,
  "/src/assets/property-2.jpg": p2,
  "/src/assets/property-3.jpg": p3,
};

export function resolveImg(url: string | null | undefined): string {
  if (!url) return p1;
  return ASSET_MAP[url] ?? url;
}
