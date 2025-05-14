import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import React, { useRef, useState } from "react";

import FigmaRecCard from "../FigmaRecCard";
import CardTableRow from "./CardTableRow";
import { getCommonPinningStyles } from "./getCommonPinningStyles";
import InstanceDetailRow from "./InstanceDetailRow";
import RecommendationList from "./RecommendationList ";

const DataTable = ({
  columns,
  data,
  prev,
  next,
  limit,
  setLimit,
  total,
  ref,
}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const dialogRef = useRef();
  const [selected, setSelected] = useState(null);

  const openDialog = ({ data }) => {
    setSelected(data);
    dialogRef.current?.click();
  };

  const hasData = table.getRowModel().rows?.length;

  return (
    <div className="rounded-md border flex flex-col flex-1 bg-muted/60 overflow-auto">
      <Table className="table-auto border-separate border-spacing-y-2 w-full px-4 md:px-6">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-muted">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="font-bold"
                  style={getCommonPinningStyles(header.column)}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {hasData ? (
            table.getRowModel().rows.map((row) => (
              <CardTableRow
                key={row.id}
                onClick={() => openDialog(row.original)}
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
                    className="font-medium text-muted-foreground"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </CardTableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell ref={ref} colSpan={table.getAllColumns().length}>
              <Loader2 size={30} className="mx-auto animate-spin" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="w-full mt-auto bg-background flex items-center justify-end space-x-2 py-4 border-t px-4">
        <p className="mr-auto text-sm text-muted-foreground font-semibold">{`${data.length} of ${total} row(s).`}</p>

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
      {/* Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button ref={dialogRef} variant="outline" className="hidden">
            Open Dialog
          </Button>
        </DialogTrigger>

        <DialogContent className="h-fit md:max-w-[900px] lg:max-w-[950px] p-0">
          {selected && (
            <>
              <DialogHeader className="p-4 py-2 bg-background flex flex-row z-20 justify-between items-center border-b">
                <DialogTitle className="text-2xl font-semibold">
                  {selected.currentPlatform.instanceType}
                </DialogTitle>
                <DialogClose>
                  <X size={18} />
                </DialogClose>
              </DialogHeader>

              <DialogDescription className="grid grid-cols-2 gap-4 p-4 text-lg font-semibold">
                <p className="col-span-2">Current Platform</p>
                <InstanceDetailRow
                  label="Instance Type"
                  value={selected.currentPlatform.instanceType}
                />
                <InstanceDetailRow
                  label="vCPU"
                  value={selected.currentPlatform.vCPU}
                />
                <InstanceDetailRow
                  label="Monthly Cost"
                  value={`$ ${selected.currentPlatform.monthlyCost}`}
                />
                <InstanceDetailRow
                  label="Annual Cost"
                  value={`$ ${selected.currentPlatform.annualCost}`}
                />

                <p className="col-span-2 mt-6 text-xl font-bold text-primary/90">
                  Recommendations
                </p>
                <RecommendationList
                  recommendations={selected.recommendations}
                />
              </DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DataTable;
