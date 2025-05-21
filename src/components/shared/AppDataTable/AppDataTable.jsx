import React, { useEffect, lazy } from "react";
import { Loader2 } from "lucide-react";
import DataTable from "../DataTable/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchDefaultAmdData } from "@/redux/features/amdList/amd.slice";
import { selectAmdLoading } from "@/redux/features/amdList/amd.selector";

const Searchbox = lazy(() => import("../Searchbox/Searchbox"));

function AppDataTable() {
  const dispatch = useDispatch();

  const loading = useSelector(selectAmdLoading);

  useEffect(() => {
    dispatch(fetchDefaultAmdData());
  }, [dispatch]);

  return (
    <>
      <Searchbox />
      {loading ? (
        <div className="h-full w-full flex justify-center">
          <Loader2 size={20} className="animate-spin" />
        </div>
      ) : (
        <DataTable />
      )}
    </>
  );
}

export default AppDataTable;
