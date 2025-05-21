import { useMemo } from "react";

export function GetColumns() {
  return useMemo(
    () => [
      {
        accessorKey: "SR",
        header: "#",
        size: 30,
        maxSize: 30,
        cell: ({ row }) => `${row.original.id + 1}.`,
      },
      {
        accessorKey: "zone",
        header: "Region",
        cell: ({ row }) => (
          <p className="text-yellow-600">
            {row.original.data.currentPlatform?.zone || "-"}
          </p>
        ),
      },
      {
        accessorKey: "instanceType",
        header: "Instance",
        cell: ({ row }) =>
          row.original.data.currentPlatform?.instanceType || "-",
      },
      {
        accessorKey: "annualCost",
        header: <p className="text-center">Annual Cost</p>,
        cell: ({ row }) => {
          const cost = Number(
            row.original.data.currentPlatform?.annualCost
          ).toFixed(2);
          return <p className="text-center">{cost ? `$ ${cost}` : "-"}</p>;
        },
      },
      ...["r0", "r1", "r3"].map((key) => ({
        accessorKey: key,
        header: <p className="text-center">{getColumnTitle(key)}</p>,
        cell: ({ row }) => {
          const recommendation = row.original.data.recommendations[0];
          return (
            <p className="text-center">
              {recommendation
                ? `${recommendation.savingsInPercentage}% (${recommendation.instanceType})`
                : "-"}
            </p>
          );
        },
      })),
    ],
    []
  );
}

function getColumnTitle(key) {
  switch (key) {
    case "r0":
      return "Hourly Cost Optimization";
    case "r1":
      return "Modernize";
    case "r3":
      return "Modernize & Downsize";
    default:
      return key;
  }
}
