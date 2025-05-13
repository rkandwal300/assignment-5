import React from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

function FigmaCard(props) {
  const {
    currentPlatform: { instanceType, annualCost, zone },
    recommendations,
  } = props;
  return (
    <Card
      className={
        "grid grid-cols-3 min-h-44 w-full sm:min-w-[471px] px-4 font-semibold text-sm"
      }
    >
      <p className="col-span-3 text-xl">{instanceType}</p>
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
}

export default FigmaCard;
