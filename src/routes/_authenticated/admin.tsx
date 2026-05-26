import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { Building2, CalendarCheck, Heart, BarChart3, Home, LogOut } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
  head: () => ({ meta: [{ title: "Admin — Pennyworth" }] }),
});

function AdminLayout() {
  const { isAdmin, loading, signOut, user } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-charcoal/60">Loading…</div>;
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-ivory px-6">
        <div className="max-w-md text-center">
          <h1 className="font-display text-4xl text-charcoal">Admins only</h1>
          <p className="mt-3 text-sm text-charcoal/60">
            Your account ({user?.email}) doesn't have admin access. Ask an existing admin to grant the role.
          </p>
          <Link to="/" className="mt-6 inline-block rounded-full bg-terracotta px-6 py-3 text-sm text-ivory">
            Back home
          </Link>
        </div>
      </main>
    );
  }

  const nav = [
    { to: "/admin", label: "Overview", icon: BarChart3 },
    { to: "/admin/properties", label: "Properties", icon: Building2 },
    { to: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
    { to: "/admin/likes", label: "Engagement", icon: Heart },
  ];

  return (
    <main className="min-h-screen bg-ivory grain">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <header className="flex items-center justify-between border-b border-charcoal/10 pb-6">
          <div>
            <Link to="/" className="font-display italic text-2xl text-charcoal">Pennyworth</Link>
            <span className="ml-3 small-caps text-xs text-terracotta">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-charcoal/70 hover:text-terracotta">
              <Home size={14} /> View site
            </Link>
            <button onClick={signOut} className="inline-flex items-center gap-1.5 text-xs text-charcoal/70 hover:text-terracotta">
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </header>

        <nav className="mt-6 flex gap-2 overflow-x-auto">
          {nav.map(({ to, label, icon: Icon }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                  active ? "bg-charcoal text-ivory" : "bg-card text-charcoal/70 hover:bg-peach-light"
                }`}
              >
                <Icon size={14} /> {label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
