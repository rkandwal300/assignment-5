import { getData } from "@/lib/getData";
import React, { useEffect, useState } from "react";
import DataTable from "../DataTable/DataTable";
import { Column } from "../DataTable/column";
import useIsVisible from "@/hooks/useIsVisible";
import { Loader2 } from "lucide-react";

function AppDataTable() {
  const { ref: targetRef, skip } = useIsVisible();

  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [loading, setLoading] = useState(true);

  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const { userData, total } = await getData(limit, skip);
      setData((prev) => [...prev, ...userData]);
      setDataLength(total);
      setLoading(false);
    };

    const timeout = setTimeout(() => {
      fetchData();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [limit, skip]);

  if (loading)
    return (
      <div className="h-screen w-full flex justify-center items-center ">
        <Loader2 size={30} className="animate-spin" />
      </div>
    );
  return (
    <DataTable
      data={data}
      columns={Column}
      limit={limit}
      setLimit={setLimit}
      targetRef={targetRef}
      total={dataLength}
      // prev={() => setSkip((prev) => (prev == 0 ? 0 : prev - 10))}
      // next={() => setSkip((prev) => prev + 10)}
    />
  );
}

export default AppDataTable;
