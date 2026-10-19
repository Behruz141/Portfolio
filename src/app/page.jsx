import ProjectsPage from "@/components/projects/ProjectsPage";
import About from "@/sections/about/About";
import Services from "@/sections/services/Services";
import Contact from "@/sections/contact/Contact";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-16 md:gap-24">
          {/* 1. Haqimda */}
          <section id="about" className="w-full scroll-mt-24">
            <About />
          </section>

          {/* 2. Loyihalar */}
          <section id="projects" className="w-full scroll-mt-24">
            <ProjectsPage />
          </section>

          {/* 3. Xizmatlar & Narxlar */}
          <section id="services" className="w-full scroll-mt-24">
            <Services />
          </section>

          {/* 4. Aloqa & Buyurtma */}
          <section id="contact" className="w-full scroll-mt-24">
            <Contact />
          </section>
        </div>
      </div>
    </div>
  );
}
