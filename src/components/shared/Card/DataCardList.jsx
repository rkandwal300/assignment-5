import { getData } from "@/lib/getData";
import React, { useEffect, useRef, useState } from "react";
import DataCard from "../DataCard";
import { Loader2 } from "lucide-react";
import RecommendationCard from "./RecommendationCard";
import useIsVisible from "@/hooks/useIsVisible";

function DataCardList() {
  const targetRef = useRef();
  const skip = useIsVisible(targetRef);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => { 
    (async () => {
      const res = await getData(10, skip);
      setData((prev) => [...prev, ...res]);
      setLoading(false);
    })(); 
}, [skip]);

  if (loading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        loading......
      </div>
    );
  return (
    <>
      <section className="p-4 md:p-6 flex flex-wrap xl:grid-cols-4 md:justify-start justify-center 2xl:flex 2xl:flex-wrap gap-4 md:gap-6 overflow-auto">
        {data.map((val, index) => (
          <RecommendationCard
            key={`${val.data.cspProvider}-${index}`}
            {...val.data}
          />
        ))}
      </section>
      <p ref={targetRef} className="w-full flex justify-center py-4">
        <Loader2 className="animate-spin text-primary" size={40} />
      </p>
    </>
  );
}

export default DataCardList;
