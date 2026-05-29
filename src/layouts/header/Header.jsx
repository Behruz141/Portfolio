import PortfolioLogo from "../../components/logo/PortfolioLogo";
import { Link } from "react-router-dom";
import HeaderMenu from "../../components/header-menu/HeaderMenu";
import MobileMenu from "../../components/hamburger-menu/MobileMenu";
import LanguageSwitcher from "../../components/i18n/LanguageSwitcher";
import ThemeToggle from "../../components/theme/ThemeToggle";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-60 bg-gray-100/80 dark:bg-[#333333]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
      {/* max-w-7xl yoki container orqali markazlash */}
      <div className="container mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Aslo siqilmasligi uchun shrink-0 */}
          <Link
            to="/"
            className="shrink-0 transition-transform duration-200 hover:scale-105"
          >
            <PortfolioLogo size="lg" />
          </Link>

          {/* Desktop Menu - Katta ekranlarda markazda turadi */}
          <div className="hidden md:flex items-center justify-center flex-1 px-4">
            <HeaderMenu />
          </div>

          {/* Right Actions - O'ng tomon, shrink-0 bilan himoyalangan */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <ThemeToggle />
            <LanguageSwitcher />

            {/* Mobile Menu - Faqat mobil uchun */}
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
