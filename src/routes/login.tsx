import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>) => ({
    redirect: (s.redirect as string) || "/",
  }),
  component: LoginPage,
  head: () => ({ meta: [{ title: "Sign in — Pennyworth" }] }),
});

function LoginPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: { display_name: name },
        },
      });
      if (error) toast.error(error.message);
      else {
        toast.success("Welcome to Pennyworth");
        navigate({ to: redirect });
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast.error(error.message);
      else {
        toast.success("Signed in");
        navigate({ to: redirect });
      }
    }
    setBusy(false);
  };

  return (
    <main className="min-h-screen bg-ivory grain flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-3xl bg-card p-10 shadow-bloom">
        <Link to="/" className="font-display italic text-3xl text-charcoal">Pennyworth</Link>
        <h1 className="mt-8 font-display text-4xl text-charcoal">
          {mode === "login" ? "Welcome back" : "Create an account"}
        </h1>
        <p className="mt-2 text-sm text-charcoal/60">
          {mode === "login" ? "Sign in to save homes and book tours." : "Save properties, book viewings, and more."}
        </p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          {mode === "signup" && (
            <div>
              <label className="text-xs small-caps text-charcoal/60">Name</label>
              <input
                value={name} onChange={(e) => setName(e.target.value)} required
                className="mt-1 w-full rounded-xl border border-charcoal/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-terracotta"
              />
            </div>
          )}
          <div>
            <label className="text-xs small-caps text-charcoal/60">Email</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="mt-1 w-full rounded-xl border border-charcoal/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-terracotta"
            />
          </div>
          <div>
            <label className="text-xs small-caps text-charcoal/60">Password</label>
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8}
              className="mt-1 w-full rounded-xl border border-charcoal/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-terracotta"
            />
          </div>
          <button
            type="submit" disabled={busy}
            className="mt-2 w-full rounded-full bg-terracotta px-6 py-3.5 text-sm font-medium text-ivory shadow-soft transition-all hover:shadow-bloom disabled:opacity-60"
          >
            {busy ? "…" : mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="mt-6 w-full text-center text-xs text-charcoal/60 hover:text-terracotta"
        >
          {mode === "login" ? "No account? Sign up" : "Have an account? Sign in"}
        </button>
      </div>
    </main>
  );
}
