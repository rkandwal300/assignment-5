import { Card, CardTitle } from "@/components/ui/card";
import React from "react";

function FigmaRecCard(props) {
  const {
    instanceType,
    monthlyCost,
    savingsInPercentage,
    perf,
    annualSavings,
    vCPU,
  } = props;
  return (
    <Card
      className={"flex flex-col gap-2 items-start w-fit sm:min-w-60 text-xs py-2"}
    >
      {props?.title && (
        <CardTitle className={"text-lg  px-4 font-semibold border-b w-full"}>
          {props.title}
        </CardTitle>
      )}
      <div className="flex flex-col gap-2 w-full px-4">
        <div className="font-bold w-full text-sm flex justify-between items-center">
          <p>{instanceType}</p>
          <p className="text-green-400">{`Savings ${savingsInPercentage}%`}</p>
        </div>
        <div className="w-full">
          <div className="flex justify-between w-full">
            <span> Monthly Cost </span>
            <span>${Number(monthlyCost).toFixed(2)}</span>
          </div>
          <div className="flex justify-between w-full">
            <span>vCPU </span>
            <span>{vCPU}</span>
          </div>
          <div className="flex justify-between w-full">
            <span> Annual Cost </span>
            <span>${Number(annualSavings).toFixed(2)}</span>
          </div>
          <div className="flex justify-between w-full">
            <span> Annual Savings </span>
            <span>${Number(annualSavings).toFixed(2)}</span>
          </div>
          <div className="flex justify-between w-full">
            <span> Performance Improvement </span>
            <span>{Number(perf).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default FigmaRecCard;
