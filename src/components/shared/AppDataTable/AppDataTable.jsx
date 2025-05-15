import React, { useCallback, useEffect, useState } from "react";
import { getData } from "@/lib/getData";
import DataTable from "../DataTable/DataTable";
import { Column } from "../DataTable/column";
import useIsVisible from "@/hooks/useIsVisible";
import { Loader2 } from "lucide-react";
import Searchbox from "../Searchbox/Searchbox";
 
function AppDataTable() {
  const { ref: targetRef, skip } = useIsVisible();

  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [dataLength, setDataLength] = useState(0);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);

  const fetchPaginatedData = useCallback(async () => {
    const { userData, total } = await getData(limit, skip);
    setData((prev) => [...prev, ...userData]);
    setDataLength(total);
    setLoading(false);
  }, [limit, skip]);

  const fetchFilteredData = useCallback(async () => {
    const { userData, total } = await getData(skip, 0, query);
    setData(userData);
    setDataLength(total);
    setLoading(false);
  }, [skip, query]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query) return;
      fetchPaginatedData();
    }, 2000);
    return () => clearTimeout(timeout);
  }, [fetchPaginatedData, query]);

  useEffect(() => {
    if (query) {
      fetchFilteredData();
      fetchFilteredData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchFilteredData]);
 
  return (
    <>
      <Searchbox query={query} setQuery={setQuery} setData={setData} total={dataLength} updateTotal={setDataLength} />
      {loading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <Loader2 size={30} className="animate-spin" />
        </div>
      ) : (
        <DataTable
          data={data}
          columns={Column}
          limit={limit}
          setLimit={setLimit}
          targetRef={targetRef}
          total={dataLength}
        />
      )}
    </>
  );
}

export default AppDataTable;
