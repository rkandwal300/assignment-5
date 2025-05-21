import { flexRender } from "@tanstack/react-table";
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
import { useDispatch, useSelector } from "react-redux";
import {
  selectAmdData,
  selectAmdLimit,
  selectAmdStartingIndex,
  selectAmdTotal,
} from "@/redux/features/amdList/amd.selector";
import { GetColumns } from "./column";
import { useRef } from "react";
import {
  fetchAmdDataPagination,
  TRIGGER_DOWN_INDEX,
  TRIGGER_UP_INDEX,
  updateStartingIndex,
} from "@/redux/features/amdList/amd.slice";

const DataTable = () => {
  const scrollContainerRef = useRef(null);
  const dispatch = useDispatch();
  const data = useSelector(selectAmdData);
  const total = useSelector(selectAmdTotal);
  const limit = useSelector(selectAmdLimit);
  const startIndex = useSelector(selectAmdStartingIndex);

  const columns = GetColumns();
  const { table, selected, openDialog, hasData, dialogRef } = useDataTable(
    data,
    columns
  );

  const updateWindow = (newStart) => {
    const boundedStart = Math.max(0, Math.min(newStart, total - limit));
    dispatch(updateStartingIndex(boundedStart));

    dispatch(
      fetchAmdDataPagination({
        starting: boundedStart,
        ending: boundedStart + limit,
      })
    );
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const firstRow = container.querySelector('[data-slot="table-row"]');
    const rowHeight = firstRow?.offsetHeight;
    if (!rowHeight) return;

    if (!rowHeight) return;

    const scrollTop = container.scrollTop;
    const visibleCardIndex = Math.floor(scrollTop / rowHeight);

    if (visibleCardIndex >= TRIGGER_DOWN_INDEX && startIndex + limit < total) {
      updateWindow(startIndex + 1);
    }

    if (visibleCardIndex <= TRIGGER_UP_INDEX && startIndex > 0) {
      updateWindow(startIndex - 1);
    }
  };

  return (
    <div className="rounded-md  flex flex-col flex-1 overflow-auto">
      <Table
        onScroll={handleScroll}
        tableRef={scrollContainerRef}
        className="table-auto border-separate border-spacing-y-2 w-full px-4 md:px-6"
      >
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
        </TableBody>
      </Table>
      <Pagination />

      <DetailDialog selected={selected} dialogRef={dialogRef} />
    </div>
  );
};

export default DataTable;
