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
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; 
import FigmaRecCard from "../FigmaRecCard";
import { getCommonPinningStyles } from "./getCommonPinningStyles";

const DataTable = ({ columns, data, prev, next, limit, setLimit }) => {
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
    <div className="rounded-md border flex flex-col flex-1 justify-between overflow-hidden bg-muted/60">
      <Table className={"border-b pt-20"}>
        <TableHeader className={' '}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className={"bg-muted"}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
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
                <TableRow
                  onClick={() => handleDialogContent(row.original)}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Dialog>
        <DialogTrigger asChild>
          <Button ref={dialogRef} variant="outline" className={"hidden"}>
            Edit Profile
          </Button>
        </DialogTrigger>
        <DialogContent
          className={"h-fit md:max-w-[900px] lg:max-w-[950px]  p-0"}
        >
          {selected && (
            <>
              <DialogHeader
                className={"p-4 w-96 grid grid-cols-2  font-semibold text-sm"}
              >
                <DialogTitle className={"col-span-2"}>
                  Current Platform{" "}
                </DialogTitle>
                <strong>Instance Type </strong>
                <strong>{selected.currentPlatform.instanceType} </strong>
                <strong>vCPU </strong>
                <strong>{selected.currentPlatform.vCPU} </strong>
                <strong>Monthly Cost </strong>
                <strong>${selected.currentPlatform.monthlyCost} </strong>
                <strong>Annual Cost </strong>
                <strong>${selected.currentPlatform.annualCost} </strong>
              </DialogHeader>

              <DialogDescription className="flex border-t flex-wrap overflow-auto h-[390px] lg:flex-nowrap">
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
              </DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
      <div className="w-full bg-background flex items-center justify-end space-x-2 py-4 border-t px-4">
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

        <Button
          variant="outline"
          size="sm"
          onClick={prev}
          //   disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={next}
          //   disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
export default DataTable;
