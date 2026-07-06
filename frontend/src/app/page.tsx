import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import Services from "@/components/Services";
import CaseStudies from "@/components/CaseStudies";
import ProcessTimeline from "@/components/ProcessTimeline";
import TechStack from "@/components/TechStack";
import Testimonials from "@/components/Testimonials";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

// Force dynamic rendering to fetch the latest leads, blog posts, and testimonials
export const revalidate = 0;

export default async function Home() {
  let caseStudies: any[] = [];
  let testimonials: any[] = [];

  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  try {
    const res = await fetch(`${backendUrl}/api/case-studies`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      caseStudies = data.caseStudies || [];
    } else {
      console.error("Failed to fetch case studies from backend:", res.statusText);
    }
  } catch (err) {
    console.error("Error fetching case studies in homepage Server Component:", err);
  }

  try {
    const res = await fetch(`${backendUrl}/api/testimonials`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      testimonials = data.testimonials || [];
    } else {
      console.error("Failed to fetch testimonials from backend:", res.statusText);
    }
  } catch (err) {
    console.error("Error fetching testimonials in homepage Server Component:", err);
  }

  return (
    <main className="min-h-screen bg-[#05060a] relative select-none">
      <Navbar />
      <Hero />
      <LogoMarquee />
      <Services />
      <CaseStudies caseStudies={caseStudies} />
      <ProcessTimeline />
      <TechStack />
      <Testimonials testimonials={testimonials} />
      <LeadForm />
      <Footer />
    </main>
  );
}
