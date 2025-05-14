import { Button } from "@/components/ui/button";
import React from "react"; 
import FigmaRecCard from "../Card/FigmaRecCard";

const RecommendationList = ({ recommendations = [] }) => (
  <div className="col-span-2 w-full flex flex-wrap gap-2">
    {recommendations.map((rec, idx) => (
      <Button key={rec.instanceType + idx} variant="ghost" className="h-fit">
        <FigmaRecCard {...{ ...rec, index: idx + 1 }} />
      </Button>
    ))}
  </div>
);

export default RecommendationList;
