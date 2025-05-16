import { Button } from "@/components/ui/button";
import React from "react";
import FigmaRecCard from "../Card/FigmaRecCard";

const RecommendationList = ({ recommendations = [] }) => (
  <div className="col-span-2 w-full flex flex-wrap gap-2">
    {recommendations.map((rec, idx) => {
      let title;
      if (idx == 0) title = "Hourly Cost Optimization";
      else if (idx == 1) title = "Modernize";
      else if (idx == 2) title = "Modernize & Downsize";
      return ( 
          <FigmaRecCard key={rec.instanceType + idx}  {...{ ...rec, index: idx + 1, title }} />
       
      );
    })}
  </div>
);

export default RecommendationList;
