import { getData } from "@/lib/getData";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import RecommendationCard from "./RecommendationCard";
import useIsVisible from "@/hooks/useIsVisible";

function DataCardList() {
  const { ref: targetRef, skip } = useIsVisible();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { userData } = await getData(10, skip);
      setData((prev) => [...prev, ...userData]);
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
    <div className=" flex flex-col overflow-auto">
      <section className="p-4 md:p-6 flex flex-wrap xl:grid-cols-4 md:justify-start justify-center 2xl:flex 2xl:flex-wrap gap-4 md:gap-6">
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
    </div>
  );
}

export default DataCardList;
