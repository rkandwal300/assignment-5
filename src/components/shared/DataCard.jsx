import React from "react";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

function DataCard({ currentPlatform }) {
  const temp = {
    zone: "Zone",
    numberOfInstances: "Instances",
    perf: "Performance",
    vCPU: "vCPU",
    pricingModel: "Pricing Model",
    savingsInPercentage: "Savings",
    monthlyCost: "Monthly Cost",
    annualCost: "Annual Savings",
    annualSavings: "Annual Savings", 
  };
  return (
    <Card className="p-4 hover:shadow-lg cursor-pointer md:max-w-sm w-xs">
      <CardTitle className="text-lg font-bold text-primary">
        {currentPlatform.instanceType}
      </CardTitle>
      {Object.keys(temp).map(
        (key) =>
          currentPlatform[key] && (
            <div key={key} className="grid grid-cols-2 gap-4">
              <div className="flex justify-between font-medium">
                {temp[key]} <span>:</span>
              </div>
               
                <span className="flex justify-end items-center" >
                  {key == "savingsInPercentage" ? (
                <Badge
                   
                  variant={cn(
                    currentPlatform[key] > 0 ? "success" : "destructive"
                  )}
                >
                  {currentPlatform[key] + "%"}
                </Badge>
              ) :(key == "annualCost" || key == "monthlyCost" || key=="annualSavings" ? "$ " : "") +
                    currentPlatform[key] +
                    (key == "savingsInPercentage" ? "%" : "") }
                </span>
             
            </div>
          )
      )}
      <CardFooter className={ "flex justify-end px-0 text-xs font-bold text-primary"}> Click here to view Details</CardFooter>
    </Card>
  );
}

export default DataCard;
