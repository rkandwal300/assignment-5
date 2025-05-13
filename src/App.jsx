import { Button } from "@/components/ui/button";
import { useTheme } from "./context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import DataCardList from "./components/shared/DataCardList";
function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <section className="h-full w-full pt-16 overflow-hidden">
      <header className="py-4 z-50 bg-background w-full fixed top-0 flex justify-between items-center px-4 md:px-6 border-b">
        <h3 className="text-xl font-semibold">Assignment-5</h3>
        <Button
          onClick={toggleTheme}
          variant="outline"
          size="icon"
          className={"ml-auto mr-6"}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </header>
      <DataCardList />
    </section>
  );
}

export default App;
