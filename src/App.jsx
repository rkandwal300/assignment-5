import AppDataTable from "./components/shared/AppDataTable/AppDataTable";
import DataCardList from "./components/shared/Card/DataCardList";
import Header from "./components/shared/Header/Header";

function App() {
  return (
    <section className="h-screen flex flex-col gap-4 w-full overflow-hidden">
      <Header />

      <AppDataTable />

      {/* <DataCardList /> */}
    </section>
  );
}

export default App;

// remove: monthly cost
// add: