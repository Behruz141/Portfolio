import ProjectsPage from "@/components/projects/ProjectsPage";
import About from "@/sections/about/About";
import Contact from "@/sections/contact/Contact";
import Services from "@/sections/services/Services";

// Bosh sahifa ("/") — oldingi Home.jsx
export default function HomePage() {
  return (
    <div className="min-h-screen w-full transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-40">
          <section id="about" className="w-full scroll-mt-12">
            <About />
          </section>
          <section id="services" className="w-full scroll-mt-24">
            <Services />
          </section>
          <section id="projects" className="w-full scroll-mt-24">
            <ProjectsPage />
          </section>
          {/* Eslatma: bu yerda oldin ikkinchi marta id="about" bor edi (xato).
              "contact" id'si Contact komponentining ichida allaqachon bor. */}
          <section className="w-full scroll-mt-24">
            <Contact />
          </section>
        </div>
      </div>
    </div>
  );
}
