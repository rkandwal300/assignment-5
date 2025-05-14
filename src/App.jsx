import { Button } from "@/components/ui/button";
import { useTheme } from "./context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import AppDataTable from "./components/shared/AppDataTable/AppDataTable";
import { Input } from "./components/ui/input";
function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <section className="h-screen flex flex-col gap-4 w-full overflow-hidden">
      <header className="py-4 z-50 bg-background w-full flex justify-between items-center px-4 md:px-6 border-b">
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
      <div className="flex flex-col justify-between px-4 md:px-6">
        <Input className={'bg-muted max-w-60 placeholder:font-semibold font-semibold'} placeholder="Search......"  />

      </div>
      <AppDataTable />

      {/* <DataCardList /> */}
    </section>
  );
}

export default App;
