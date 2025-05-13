import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CalendarDays,
  Copy,
  EllipsisVertical,
  MoreHorizontal,
} from "lucide-react";

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
      <>
        <div
          className="hidden lg:flex gap-2 items-center"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="lg:hidden h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-56"
          >
            <DropdownMenuLabel className={"font-semibold"}>
              Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Copy
                <DropdownMenuShortcut>
                  <Copy size={18} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Calender
                <DropdownMenuShortcut>
                  <CalendarDays size={18} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    ),
    maxSize: 65,
    size: 50,
  },
];
