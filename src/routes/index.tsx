import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { FeaturedProperties } from "@/components/site/FeaturedProperties";
import { WhyPennyworth } from "@/components/site/WhyPennyworth";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Testimonials } from "@/components/site/Testimonials";
import { LatestListings } from "@/components/site/LatestListings";
import { CTABanner } from "@/components/site/CTABanner";
import { Footer } from "@/components/site/Footer";
import { CursorDot } from "@/components/site/CursorDot";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Pennyworth Real Estate — Find Your Forever Home" },
      { name: "description", content: "A boutique real estate team curating warm, well-loved homes. 1,200+ homes sold, 98% client satisfaction, 15 years of craft." },
      { property: "og:title", content: "Pennyworth Real Estate — Find Your Forever Home" },
      { property: "og:description", content: "Boutique real estate. Warm homes, patient matchmaking, and a team that listens before it lists." },
    ],
  }),
});

function Index() {
  return (
    <main className="bg-ivory text-charcoal">
      <CursorDot />
      <Navbar />
      <Hero />
      <FeaturedProperties />
      <WhyPennyworth />
      <HowItWorks />
      <Testimonials />
      <LatestListings />
      <CTABanner />
      <Footer />
    </main>
  );
}
