import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Portfolio } from "@/components/Portfolio";
import { ProjectDetailPage } from "@/components/ProjectDetailPage";
import { ScrollThroughSection } from "@/components/ScrollThroughSection";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { WhatsAppPopup } from "@/components/WhatsAppPopup";
import { CookiePopup } from "@/components/CookiePopup";
import { LeadCardPopup } from "@/components/LeadCardPopup";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import styles from "./App.module.css";

export default function App() {
  const reduce = useReducedMotion();
  const [projectRouteId, setProjectRouteId] = useState<string | null>(null);

  useEffect(() => {
    const resolveRoute = () => {
      const raw = window.location.hash || "";
      const match = raw.match(/^#\/project\/(.+)$/);
      setProjectRouteId(match?.[1] ? decodeURIComponent(match[1]) : null);
    };

    resolveRoute();
    window.addEventListener("hashchange", resolveRoute);
    return () => window.removeEventListener("hashchange", resolveRoute);
  }, []);

  return (
    <motion.div
      className={styles.root}
      initial={{ opacity: reduce ? 1 : 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Navbar />
      <main>
        {projectRouteId ? (
          <ProjectDetailPage projectId={projectRouteId} />
        ) : (
          <>
            <Hero />
            <About />
            <Portfolio />
            <ScrollThroughSection />
            <Services />
            <Testimonials />
            <Contact />
          </>
        )}
      </main>
      <Footer />
      <WhatsAppPopup />
      <CookiePopup />
      <LeadCardPopup />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3800,
          style: {
            fontFamily: "var(--font-body)",
            background: "var(--color-ivory)",
            color: "var(--color-espresso)",
            border: "1px solid var(--color-line)",
            boxShadow: "var(--shadow-soft)",
          },
        }}
      />
      <Analytics />
    </motion.div>
  );
}
