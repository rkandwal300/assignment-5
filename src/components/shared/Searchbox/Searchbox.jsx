import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateNewInstance from "../Form/createNewInstance";

const Searchbox = ({ query, setQuery, setData, total,updateTotal }) => {
  const handleAddData =(values) => {
    setData((prev) => [
      {
        id: String(total + 1),
        data: {
          currentPlatform: values,
          recommendations: [],
        },
      },
      ...prev,
    ]);
    updateTotal(prev=> prev+1)
  }
  return (
    <div className="flex justify-between px-4 md:px-6 bg-background ">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={"bg-muted max-w-60 placeholder:font-semibold font-semibold"}
        placeholder="Search......"
      />

      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus size={16} /> New
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] min-h-[430px] p-0">
          <CreateNewInstance onSubmit={handleAddData} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Searchbox;
