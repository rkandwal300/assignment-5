import { getData } from "@/lib/getData";
import React, { useEffect, useRef, useState } from "react";
import DataTable from "./DataTable/DataTable";
import { Column } from "./DataTable/column";
import useIsVisible from "@/hooks/useIsVisible";

function AppDataTable() {
  const targetRef = useRef();
  const skip = useIsVisible(targetRef);

  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [loading, setLoading] = useState(true);

  const [limit, setLimit] = useState(10);

  useEffect(() => {
    (async () => {
      const { userData, total } = await getData(limit, skip);
      setData((prev) => [...prev, ...userData]);
      setDataLength(total);
      setLoading(false);
    })();
  }, [limit, skip]);

  console.log({
    skip,
  });
  
  if (loading)
    return (
      <div className="h-screen w-full flex justify-center items-center ">
        loading......
      </div>
    );
  return (
    <DataTable
      data={data}
      columns={Column}
      limit={limit}
      setLimit={setLimit}
      ref={targetRef}
      total={dataLength}
      // prev={() => setSkip((prev) => (prev == 0 ? 0 : prev - 10))}
      // next={() => setSkip((prev) => prev + 10)}
    />
  );
}

export default AppDataTable;
