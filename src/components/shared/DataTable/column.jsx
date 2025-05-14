import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CalendarDays,
  Copy,
  EllipsisVertical,
  MoreHorizontal,
} from "lucide-react";

const DesktopActions = () => (
  <div
    className="hidden lg:flex gap-2 items-center"
    onClick={(e) => e.stopPropagation()}
  >
    <Button className="rounded-full w-9 aspect-square">
      <CalendarDays size={18} />
    </Button>
    <Button className="rounded-full w-9 aspect-square">
      <Copy size={18} />
    </Button>
    <Button className="rounded-full w-9 aspect-square">
      <EllipsisVertical size={18} />
    </Button>
  </div>
);

const MobileActions = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button className="lg:hidden h-8 w-8 p-0">
        <span className="sr-only">Open menu</span>
        <MoreHorizontal />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56" onClick={(e) => e.stopPropagation()}>
      <DropdownMenuLabel className="font-semibold">Actions</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          Copy
          <DropdownMenuShortcut>
            <Copy size={18} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Calendar
          <DropdownMenuShortcut>
            <CalendarDays size={18} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
);

// Render actions cell
const renderActions = () => (
  <div className="flex items-center gap-2">
    <DesktopActions />
    <MobileActions />
  </div>
);

export const Column = [
  {
    accessorKey: "SR",
    header: "#",
    size: 30,
    maxSize: 30,
    cell: ({ row }) => `${row.index + 1}.`,
  },
  {
    accessorKey: "instanceType",
    header: "Instance",
    cell: ({ row }) => {
      const { instanceType } = row.original.data.currentPlatform;
      return instanceType;
    },
  },
  {
    accessorKey: "zone",
    header: "Region",
    cell: ({ row }) => {
      const { zone } = row.original.data.currentPlatform;
      return <p className="text-yellow-600">{zone}</p>;
    },
  },
  {
    accessorKey: "monthlyCost",
    header: "Monthly Cost",
    cell: ({ row }) => {
      const { monthlyCost } = row.original.data.currentPlatform;
      return <p className="text-end">{`$ ${monthlyCost}`}</p>;
    },
  },
  {
    accessorKey: "annualCost",
    header: "Annual Cost",
    cell: ({ row }) => {
      const { annualCost } = row.original.data.currentPlatform;
      return <p className="text-end">{`$ ${annualCost}`}</p>;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: renderActions,
    size: 50,
    maxSize: 65,
  },
];
