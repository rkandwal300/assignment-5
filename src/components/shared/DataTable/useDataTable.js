import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useRef, useState } from "react";

const useDataTable = (data, columns) => {
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

  return {
    length:data.length,
    table,
    selected,
    openDialog,
    hasData,
    dialogRef,
  };
};

export default useDataTable;
