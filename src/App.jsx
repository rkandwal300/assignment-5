import { Button } from "@/components/ui/button";
import { useTheme } from "./context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import AppDataTable from "./components/shared/AppDataTable/AppDataTable";
import CreateNewInstance from "./components/shared/Form/CreateNewInstance";
function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <section className="h-screen flex flex-col gap-4 w-full overflow-hidden">
      <header className="py-4 z-50 bg-background w-full flex justify-between items-center px-4 md:px-6 border-b">
        <h3 className="text-2xl font-extrabold">AMD Instances</h3>
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
      <AppDataTable />

      {/* <DataCardList /> */}
    </section>
  );
}

export default App;
