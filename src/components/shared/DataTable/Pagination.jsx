import { useSelector } from "react-redux";
import {
  selectAmdCurrent,
  selectAmdTotal,
} from "@/redux/features/amdList/amd.selector";

const Pagination = () => {
  const total = useSelector(selectAmdTotal); 
  const current = useSelector(selectAmdCurrent);
  return (
    <div className="w-full mt-auto bg-background flex items-center justify-end space-x-2 py-4 border-t px-4">
      <p className="mr-auto text-sm text-muted-foreground font-semibold">{`${current} of ${total} row(s).`}</p>
    </div>
  );
};

export default Pagination;
