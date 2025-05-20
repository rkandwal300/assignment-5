import { Suspense } from "react";
import AppDataTable from "./components/shared/AppDataTable/AppDataTable";
import DataCardList from "./components/shared/Card/DataCardList";
import Header from "./components/shared/Header/Header";
import { Loader2 } from "lucide-react";

function App() {
  return (
    <section className="h-screen flex flex-col gap-4 w-full overflow-hidden">
      <Header />
      <Suspense
        fallback={
          <div className="h-screen w-full flex justify-center items-center">
            <Loader2 size={30} className="animate-spin" />
          </div>
        }
      >
        <AppDataTable />
      </Suspense>

      {/* <DataCardList /> */}
    </section>
  );
}

export default App;

// remove: monthly cost
// add:
