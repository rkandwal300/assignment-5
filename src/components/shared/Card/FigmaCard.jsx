import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FigmaCard = ({
  currentPlatform: { instanceType, annualCost, zone },
  recommendations,
  className,
}) => (
  <Card
    className={cn(
      "grid grid-cols-3  justify-center sm:min-w-[471px] w-fit py-2 px-4 font-semibold text-sm gap-0.5",
      className
    )}
  >
    <p className="col-span-3 text-lg">{instanceType}</p>
    <p>${annualCost}</p>
    <p> </p>
    <p>{zone}</p>
    <p>R1</p>
    <p>R2</p>
    <p>R3</p>

    <Badge
      variant={"dark_primary"}
    >{`${recommendations[0].savingsInPercentage}% (${recommendations[0].instanceType})`}</Badge>
    <Badge
      variant={"dark_primary"}
    >{`${recommendations[1].savingsInPercentage}% (${recommendations[0].instanceType})`}</Badge>
    <Badge
      variant={"dark_primary"}
    >{`${recommendations[2].savingsInPercentage}% (${recommendations[0].instanceType})`}</Badge>
  </Card>
);

export default FigmaCard;
