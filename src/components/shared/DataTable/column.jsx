export const Column = [
  {
    accessorKey: "SR",
    header: "#",
    cell: ({row}) => `${row.index + 1}.`,
    size:30,
    maxSize:30
  },
  {
    accessorKey: "instanceType",
    header: "Instance",
    cell: ({row}) =>( row.original.data.currentPlatform.instanceType) ,
  },
  {
    accessorKey: "zone",
    header: "Region",
    cell: ({row}) =>( row.original.data.currentPlatform.zone) ,
  },
   
  {
    accessorKey: "monthlyCost",
    header: "Monthly Cost",
    cell: ({row}) =>( <p className="#text-end">{`$ ${row.original.data.currentPlatform.monthlyCost}`}</p>) ,
  },

  {
    accessorKey: "annualCost",
    header: "Annual Cost",
    cell: ({row}) =>(<p className="#text-end">{`$ ${ row.original.data.currentPlatform.annualCost}`}</p>) ,
  },
 
];

 