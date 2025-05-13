import { Button } from "@/components/ui/button";
import { CalendarDays, Copy, EllipsisVertical } from "lucide-react";

export const Column = [
  {
    accessorKey: "SR",
    header: "#",
    cell: ({ row }) => `${row.index + 1}.`,
    size: 30,
    maxSize: 30,
  },
  {
    accessorKey: "instanceType",
    header: "Instance",
    cell: ({ row }) => row.original.data.currentPlatform.instanceType,
  },
  {
    accessorKey: "zone",
    header: "Region",
    cell: ({ row }) => row.original.data.currentPlatform.zone,
  },

  {
    accessorKey: "monthlyCost",
    header: "Monthly Cost",
    cell: ({ row }) => (
      <p className="#text-end">{`$ ${row.original.data.currentPlatform.monthlyCost}`}</p>
    ),
  },

  {
    accessorKey: "annualCost",
    header: "Annual Cost",
    cell: ({ row }) => (
      <p className="#text-end">{`$ ${row.original.data.currentPlatform.annualCost}`}</p>
    ),
  },

  {
    accessorKey: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex gap-2 items-center bg-red-300">
        <Button className={"rounded-full  w-9 aspect-square"}>
          <CalendarDays size={18} />
        </Button>
        <Button className={"rounded-full  w-9 aspect-square"}>
          <Copy size={18} />
        </Button>
        <Button className={"rounded-full  w-9 aspect-square"}>
          <EllipsisVertical size={18} />
        </Button>
      </div>
    ),
    maxSize:50,
    size:50
  },
];
