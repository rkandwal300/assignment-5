import { Card } from "@/components/ui/card";
import React from "react"; 

function FigmaRecCard(props) {
  const { instanceType, monthlyCost, annualSavings, savingsInPercentage } = props;
  console.log({props})
  return (
    <Card className={"flex flex-col gap-2 items-start w-full sm:min-w-72 px-4 text-xs"}>
      <div className="font-bold w-full text-sm flex justify-between items-center">
        <p>{instanceType}</p>
        <p className="text-green-400">{`Save ${savingsInPercentage}%`}</p>
      </div>
       
      <p>{instanceType}</p>
      <p>Monthly Cost: ${monthlyCost}</p>
      <p> Annual Cost: ${annualSavings}</p>
    </Card>
  );
}

export default FigmaRecCard;
