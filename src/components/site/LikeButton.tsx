import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export function LikeButton({
  propertyId,
  size = 18,
  className = "",
}: {
  propertyId: string;
  size?: number;
  className?: string;
}) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) {
      setLiked(false);
      return;
    }
    supabase
      .from("property_likes")
      .select("id")
      .eq("user_id", user.id)
      .eq("property_id", propertyId)
      .maybeSingle()
      .then(({ data }) => setLiked(!!data));
  }, [user, propertyId]);

  const toggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!user) {
      toast("Sign in to save homes you love");
      navigate({ to: "/login", search: { redirect: window.location.pathname } });
      return;
    }
    setBusy(true);
    if (liked) {
      await supabase.from("property_likes").delete().eq("user_id", user.id).eq("property_id", propertyId);
      setLiked(false);
    } else {
      const { error } = await supabase.from("property_likes").insert({ user_id: user.id, property_id: propertyId });
      if (!error) {
        setLiked(true);
        toast.success("Saved to your favorites");
      }
    }
    setBusy(false);
  };

  return (
    <motion.button
      type="button"
      onClick={toggle}
      disabled={busy}
      whileTap={{ scale: 0.8 }}
      aria-label={liked ? "Unlike" : "Like"}
      className={`flex h-10 w-10 items-center justify-center rounded-full bg-ivory/95 shadow-soft backdrop-blur transition-colors hover:bg-ivory ${className}`}
    >
      <motion.span animate={liked ? { scale: [1, 1.4, 1] } : { scale: 1 }} transition={{ duration: 0.35 }}>
        <Heart
          size={size}
          className={liked ? "fill-terracotta text-terracotta" : "text-charcoal/70"}
        />
      </motion.span>
    </motion.button>
  );
}
