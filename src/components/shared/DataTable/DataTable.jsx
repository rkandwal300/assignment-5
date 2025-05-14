import {
  flexRender, 
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react"; 
import CardTableRow from "./CardTableRow";
import { getCommonPinningStyles } from "./getCommonPinningStyles";
import DetailDialog from "./DetailDialog";
import Pagination from "./Pagination";
import useDataTable from "./useDataTable";

const DataTable = ({
  columns,
  data,
  prev,
  next,
  limit,
  setLimit,
  total,
  targetRef,
}) => {
  const { table,length, selected, openDialog, hasData,dialogRef } = useDataTable(data, columns);
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
          {data.length < total && (
            <TableRow ref={targetRef}>
              <TableCell colSpan={table.getAllColumns().length}>
                <Loader2 size={30} className="mx-auto animate-spin" />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination
        limit={limit}
        setLimit={setLimit}
        length={length}
        total={total}
        prev={prev}
        next={next}
      />

      <DetailDialog selected={selected} dialogRef={dialogRef} />
    </div>
  );
};

export default DataTable;
