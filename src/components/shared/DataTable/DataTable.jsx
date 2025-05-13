import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FigmaRecCard from "../FigmaRecCard";
import { getCommonPinningStyles } from "./getCommonPinningStyles";
import CardTableRow from "./CardTableRow";
import { Loader2, X } from "lucide-react";

const DataTable = ({
  columns,
  data,
  prev,
  next,
  limit,
  setLimit,
  ref,
  total,
}) => {
  const dialogRef = useRef();

  const [selected, setSelected] = useState(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const handleDialogContent = ({ data }) => {
    setSelected(data);
    dialogRef.current.click();
  };

  return (
    <div className="rounded-md border flex flex-col flex-1 bg-muted/60 overflow-auto">
      <Table
        className={
          "table-auto border-separate border-spacing-y-2 w-full px-4 md:px-6"
        }
      >
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className={"bg-muted"}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={"font-bold"}
                    style={{
                      ...getCommonPinningStyles(header.column),
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <CardTableRow
                  onClick={() => handleDialogContent(row.original)}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        ...getCommonPinningStyles(cell.column),
                        width:
                          cell.column.getSize() === Number.MAX_SAFE_INTEGER
                            ? "auto"
                            : cell.column.getSize(),
                      }}
                      className={"font-medium text-muted-foreground"}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </CardTableRow>
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell className="h-24 text-center">No results.</TableCell>
            </TableRow>
          )}
          <TableRow ref={ref}>
            <TableCell colSpan={table.getAllColumns().length}>
              <Loader2 size={30} className="mx-auto animate-spin" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Dialog>
        <DialogTrigger asChild>
          <Button ref={dialogRef} variant="outline" className={"hidden"}>
            Edit Profile
          </Button>
        </DialogTrigger>
        <DialogContent
          className={"h-fit md:max-w-[900px] lg:max-w-[950px] p-0"}
        >
          {selected && (
            <>
              <DialogHeader
                className={
                  "p-4 py-2 w-full z-50 bg-background flex flex-row justify-between items-center border-b"
                }
              >
                <DialogTitle className={"text-3xl font-semibold"}>
                  {selected.currentPlatform.instanceType}
                </DialogTitle>
                <DialogClose>
                  <X size={18} />
                </DialogClose>
              
              </DialogHeader>

              <DialogDescription className="grid grid-cols-2 gap-4 p-4 text-lg font-semibold">
                <p className="col-span-2">Current Platform</p>
                <Button
                  variant={"secondary"}
                  size="lg"
                  className={"font-semibold text-lg flex justify-between"}
                >
                  <span className="text-muted-foreground">Instance Type: </span>
                  <span> {selected.currentPlatform.instanceType}</span>
                </Button>
                <Button
                  variant={"secondary"}
                  size="lg"
                  className={"font-semibold text-lg flex justify-between"}
                >
                  <span className="text-muted-foreground">vCPU: </span>
                  <span> {selected.currentPlatform.vCPU}</span>
                </Button>
                <Button
                  variant={"secondary"}
                  size="lg"
                  className={"font-semibold text-lg flex justify-between"}
                >
                  <span className="text-muted-foreground">Monthly Cost: </span>
                  <span> $ {selected.currentPlatform.monthlyCost}</span>
                </Button>
                <Button
                  variant={"secondary"}
                  size="lg"
                  className={"font-semibold text-lg flex justify-between"}
                >
                  <span className="text-muted-foreground">Annual Cost: </span>
                  <span> $ {selected.currentPlatform.annualCost}</span>
                </Button>
                <p className="col-span-2 mt-6 text-xl font-bold text-primary/90">
                  Recommendation({selected?.recommendations.length})
                </p>
                <div className="col-span-2 w-full flex flex-wrap ">
                  {selected?.recommendations?.map((rec, idx) => (
                    <Button
                      key={`${rec.instanceType}-${idx}`}
                      variant={"ghost"}
                      className={"h-fit"}
                      // onClick={() => setSelected(rec)}
                    >
                      <FigmaRecCard {...{ ...rec, index: idx + 1 }} />
                      {/* <DataCard {...{currentPlatform:rec}} /> */}
                    </Button>
                  ))}
                </div>
              </DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
      <div className="w-full mt-auto bg-background flex items-center justify-end space-x-2 py-4 border-t px-4">
        <p className="mr-auto text-sm font-semibold ">{`${data.length} of ${total} row(s).`}</p>
        <Select value={String(limit)} onValueChange={setLimit}>
          <SelectTrigger className="w-16">
            <SelectValue placeholder="0" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm" onClick={prev} disabled={!prev}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={next} disabled={!next}>
          Next
        </Button>
      </div>
    </div>
  );
};
export default DataTable;
