import React from "react";
import { Card } from "../ui/card";

function FigmaRecCard(props) {
  const { instanceType,monthlyCost, annualSavings, index } = props;
  return (
    <Card
      className={
        "grid grid-cols-2 min-h-44 w-full sm:min-w-72 px-4 font-semibold text-sm"
      }
    >
      <p className="col-span-2 text-xl">R{index}</p>
      <p>Instance Type</p>
      <p>{instanceType}</p>
      <p>Monthly Cost</p>
      <p>${monthlyCost}</p>
      <p> Annual Cost</p>
      <p>${annualSavings}</p> 
  </Card>
  );
}

export default FigmaRecCard;
