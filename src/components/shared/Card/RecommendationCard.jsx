import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DataCard from "./DataCard";
import { Button } from "../ui/button";
import FigmaCard from "./FigmaCard";
import FigmaRecCard from "./FigmaRecCard";

export default function RecommendationCard(props) {
  const recommendations = props.recommendations.map(r=> r);
  const [selected, setSelected] = useState(props.currentPlatform);
  // const temp = {
  //   zone: "Zone",
  //   numberOfInstances: "Number of Instances",
  //   vCPU: "vCPU",
  //   pricingModel: "Pricing Model",
  //   monthlyCost: "Monthly Cost",
  //   annualCost: "Annual Savings",
     
  // };
  return (
    <Dialog>
      <DialogTrigger>
        <FigmaCard {...props} />
        {/* <DataCard {...props} /> */}
      </DialogTrigger>
      <DialogContent className={"h-fit md:max-w-[900px] lg:max-w-[950px]  p-0"}>
        {/* <DialogHeader className={"border-b p-4"}>
          <DialogTitle>Details </DialogTitle>
        </DialogHeader> */}
        <DialogHeader className={"p-4 w-96 grid grid-cols-2  font-semibold text-sm"}>
          <DialogTitle className={"col-span-2"}>Current Platform </DialogTitle>
          <strong>Instance Type </strong>
          <strong>{selected.instanceType} </strong>
          <strong>vCPU </strong>
          <strong>{selected.vCPU} </strong> 
          <strong>Monthly Cost </strong>
          <strong>${selected.monthlyCost} </strong>
          <strong>Annual Cost </strong>
          <strong>${selected.annualCost} </strong>
        </DialogHeader>
     
        <DialogDescription className="flex border-t flex-wrap overflow-auto h-[390px] lg:flex-nowrap">
         
            {recommendations.map((rec, idx) => (
              <Button
                key={`${rec.instanceType}-${idx}`}
                variant={"ghost"}
                className={"h-fit"}
                onClick={() => setSelected(rec)}
              >
                <FigmaRecCard {...{...rec, index: idx+1}} />
                {/* <DataCard {...{currentPlatform:rec}} /> */}
              </Button>
            ))} 
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
