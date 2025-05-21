import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateNewInstance from "../Form/createNewInstance";
import { useDispatch, useSelector } from "react-redux";
import { selectAmdSearchQuery } from "@/redux/features/amdList/amd.selector";
import { updateQuery } from "@/redux/features/amdList/amd.slice";

const Searchbox = () => {
  const dispatch = useDispatch();

  const query = useSelector(selectAmdSearchQuery);

  const handleUpdateQuery = (e) => dispatch(updateQuery(e.target.value));
  return (
    <div className="flex justify-between px-4 md:px-6 bg-background ">
      <Input
        value={query}
        onChange={handleUpdateQuery}
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
          <CreateNewInstance />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Searchbox;
