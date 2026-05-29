import PortfolioLogo from "../../components/logo/PortfolioLogo";
import { Link } from "react-router-dom";
import HeaderMenu from "../../components/header-menu/HeaderMenu";
import MobileMenu from "../../components/hamburger-menu/MobileMenu";
import LanguageSwitcher from "../../components/i18n/LanguageSwitcher";
import ThemeToggle from "../../components/theme/ThemeToggle";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-100/80 dark:bg-[#333333]/80 backdrop-blur-md z-60 transition-colors duration-300 border-b border-gray-200 dark:border-white/10">
      <div className="container mx-auto px-4">
        {/* h-20: Standart balandlik */}
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="shrink-0">
            <PortfolioLogo size="lg" />
          </Link>

          <div className="hidden md:block">
            <HeaderMenu />
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher />

            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
