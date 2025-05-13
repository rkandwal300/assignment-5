import { getData } from "@/lib/getData";
import React, { useEffect, useState } from "react";
import DataTable from "./DataTable/DataTable";
import { Column } from "./DataTable/column";

function AppDataTable() {
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await getData(limit, skip);
      setData(res);
      setLoading(false);
    })();
  }, [limit,skip]);
console.log({skip})
  if (loading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        loading......
      </div>
    );
  return (
    <DataTable
      data={data}
      columns={Column}
      limit={limit}
      setLimit={setLimit}
      prev={() => setSkip((prev) => (prev == 0 ? 0 : prev - 10))}
      next={() => setSkip((prev) => ( prev + 10))}
    />
  );
}

export default AppDataTable;
