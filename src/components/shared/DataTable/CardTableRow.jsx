import { TableRow } from "@/components/ui/table";
import React from "react";

export default function CardTableRow(props) {
  return <TableRow {...props}  className={'cursor-pointer shadow hover:shadow-lg shadow-primary/50 hover:shadow-primary/70 hover:bg-background hover:scale-x-101'} />;
}
