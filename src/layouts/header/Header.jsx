import PortfolioLogo from "../../components/logo/PortfolioLogo";
import Link from "next/link";
import HeaderMenu from "../../components/header-menu/HeaderMenu";
import MobileMenu from "../../components/hamburger-menu/MobileMenu";
import LanguageSwitcher from "../../components/i18n/LanguageSwitcher";
import ThemeToggle from "../../components/theme/ThemeToggle";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-100/80 dark:bg-[#18181b]/80 backdrop-blur-xs border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 transition-transform duration-200 hover:scale-105"
          >
            <PortfolioLogo size="lg" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center justify-center flex-1 px-4">
            <HeaderMenu />
          </div>

          {/* O'ng tomon (Theme, Lang, Mobile) */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <ThemeToggle />
            <LanguageSwitcher />
            {/* Mobile Menu faqat telefonlarda chiqadi */}
            <div className="lg:hidden flex items-center">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
