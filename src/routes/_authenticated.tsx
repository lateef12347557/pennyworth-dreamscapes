import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated")({
  component: Gate,
});

function Gate() {
  const { user, loading } = useAuth();
  useEffect(() => {
    if (!loading && !user) {
      throw redirect({ to: "/login", search: { redirect: window.location.pathname } });
    }
  }, [user, loading]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-charcoal/60">Loading…</div>;
  if (!user) return null;
  return <Outlet />;
}
