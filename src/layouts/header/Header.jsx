import PortfolioLogo from "../../components/logo/PortfolioLogo";
import { Link } from "react-router-dom";
import HeaderMenu from "../../components/header-menu/HeaderMenu";
import MobileMenu from "../../components/hamburger-menu/MobileMenu";
import LanguageSwitcher from "../../components/i18n/LanguageSwitcher";
import ThemeToggle from "../../components/theme/ThemeToggle";

const Header = () => {
  return (
    // z-60 → z-50 ga o'zgartirildi (Tailwind standart skalasi: z-50 = 50)
    // Overlay z-index: 10000 bo'lgani uchun header (50) undan pastda qoladi ✓
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-100/80 dark:bg-[#333333]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
      <div className="container mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-center gap-10 h-20">
          {/* Logo */}
          <Link
            to="/"
            className="shrink-0 transition-transform duration-200 hover:scale-105"
          >
            <PortfolioLogo size="lg" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-center flex-1 px-4">
            <HeaderMenu />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0 pl-6">
            <ThemeToggle />
            <LanguageSwitcher />
            {/* Mobile Menu */}
            <div className="md:hidden flex items-center pl-8">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
