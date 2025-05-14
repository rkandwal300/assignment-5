import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Pagination = ({ limit, setLimit, length, total, prev, next }) => (
  <div className="w-full mt-auto bg-background flex items-center justify-end space-x-2 py-4 border-t px-4">
    <p className="mr-auto text-sm text-muted-foreground font-semibold">{`${length} of ${total} row(s).`}</p>

    <Select value={String(limit)} onValueChange={setLimit}>
      <SelectTrigger className="w-16">
        <SelectValue placeholder="0" />
      </SelectTrigger>
      <SelectContent>
        {[10, 20, 30].map((num) => (
          <SelectItem key={num} value={String(num)}>
            {num}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

    <Button variant="outline" size="sm" onClick={prev} disabled={!prev}>
      Previous
    </Button>
    <Button variant="outline" size="sm" onClick={next} disabled={!next}>
      Next
    </Button>
  </div>
);

export default Pagination;
