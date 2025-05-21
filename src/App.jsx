import { Suspense } from "react";
import AppDataTable from "./components/shared/AppDataTable/AppDataTable";
import DataCardList from "./components/shared/Card/DataCardList";
import Header from "./components/shared/Header/Header";
import { Loader2 } from "lucide-react"; 
import SlidingWindow from "./components/shared/SlidingWindow/SlidingWindow";

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
        {/* <AppDataTable /> */}
        <SlidingWindow/>
      </Suspense>
      {/* <div className="flex gap-2">
        <Button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </Button>
        <Button variant={"outline"} className="border">
          {count}
        </Button>
        <Button
          variant="destructive"
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </Button>
      </div> */}

      {/* <DataCardList /> */}
    </section>
  );
}

export default App;
