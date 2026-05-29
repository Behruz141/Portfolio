import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./layouts/footer/Footer";
import Header from "./layouts/header/Header";
import ScrollToTopButton from "./components/to-top-btn/ScrollToTopButton";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-white transition-colors duration-300">
      <Header />

      <main className="container mx-auto grow pt-24 px-4">
        <Outlet />
      </main>

      <Footer />

      {/* 2. Shu yerga, Footer'dan keyin qo'shing */}
      <ScrollToTopButton />
    </div>
  );
}

export default App;
