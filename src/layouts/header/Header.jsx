import PortfolioLogo from "../../components/logo/PortfolioLogo";
import { Link } from "react-router-dom";
import HeaderMenu from "../../components/header-menu/HeaderMenu";
import MobileMenu from "../../components/hamburger-menu/MobileMenu";
import LanguageSwitcher from "../../components/i18n/LanguageSwitcher";
import ThemeToggle from "../../components/theme/ThemeToggle";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-60 bg-gray-100/80 dark:bg-[#333333]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="shrink-0 transition-transform duration-200 hover:scale-105"
          >
            <PortfolioLogo size="lg" />
          </Link>

          {/* Desktop Menu (faqat md va undan katta) */}
          <div className="hidden md:flex items-center">
            <HeaderMenu />
          </div>

          {/* Right Actions: Tema, Til va Mobil Menu */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            {/* ThemeToggle va LanguageSwitcher hamisha ko'rinadi */}
            <ThemeToggle />
            <LanguageSwitcher />

            {/* Mobile Menu (faqat md dan kichik) */}
            <div className="md:hidden flex items-center">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
