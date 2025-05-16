 
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; 
import { Button } from "@/components/ui/button";
import {  X } from "lucide-react";
import React from "react"; 
import InstanceDetailRow from "./InstanceDetailRow";
import RecommendationList from "./RecommendationList "; 

const DetailDialog=({dialogRef,selected})=> {
  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button ref={dialogRef} variant="outline" className="hidden">
            Open Dialog
          </Button>
        </DialogTrigger>

        <DialogContent className="h-fit md:max-w-[780px] lg:max-w-[900px] p-0">
          {selected && (
            <>
              <DialogHeader className="p-4 py-2 bg-background flex flex-row z-20 justify-between items-center border-b">
                <DialogTitle className="text-2xl font-semibold">
                  {selected.currentPlatform.instanceType}
                </DialogTitle>
                <DialogClose>
                  <X size={18} />
                </DialogClose>
              </DialogHeader>

              <DialogDescription className="grid grid-cols-2 gap-4 p-4 text-lg font-semibold">
                <p className="col-span-2">Current Platform</p>
                <InstanceDetailRow
                  label="Instance Type"
                  value={selected.currentPlatform.instanceType}
                />
                <InstanceDetailRow
                  label="vCPU"
                  value={selected.currentPlatform.vCPU}
                />
                <InstanceDetailRow
                  label="Monthly Cost"
                  value={`$ ${selected.currentPlatform.monthlyCost}`}
                />
                <InstanceDetailRow
                  label="Annual Cost"
                  value={`$ ${selected.currentPlatform.annualCost}`}
                />

                <p className="col-span-2 mt-6 text-xl font-bold text-primary/90">
                  Recommendations
                </p>
                <RecommendationList
                  recommendations={selected.recommendations}
                />
              </DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
  )
}

export default DetailDialog