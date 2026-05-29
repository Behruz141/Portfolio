import ProjectsPage from "../../components/projects/ProjectsPage";
import About from "../about/About";
import Contact from "../contact/Contact";

const Home = () => {
  return (
    <div className="min-h-screen w-full transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-40">
          <section id="about" className="w-full scroll-mt-12">
            <About />
          </section>
          <section id="projects" className="w-full scroll-mt-24">
            <ProjectsPage />
          </section>
          <section id="about" className="w-full scroll-mt-24">
            <Contact/>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
