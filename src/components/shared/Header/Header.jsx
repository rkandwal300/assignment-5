import HeaderLogo from "./HeaderLogo";
import HeaderLinks from "./HeaderLinks";
import IconList from "./IconList";

function Header() {
  //   const { theme, toggleTheme } = useTheme();

  return (
    <header className="lg:py-6.5 lg:px-9 p-2.5 bg-primary z-50  w-full flex  items-center border-b">
      <HeaderLogo />
      <HeaderLinks />
      <IconList />
    </header>
  );
}

export default Header;
