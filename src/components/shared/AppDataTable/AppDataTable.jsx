import React, { useCallback, useEffect, useReducer, lazy } from "react";

import { getData } from "@/lib/getData";
import { Loader2 } from "lucide-react";
import useIsVisible from "@/hooks/useIsVisible";
import { GetColumns } from "../DataTable/column";
import { ACTIONS, reducer } from "./AppDataTableReducer";
import DataTable from "../DataTable/DataTable";

const Searchbox = lazy(() => import("../Searchbox/Searchbox"));
// const DataTable = lazy(() => import("../DataTable/DataTable"));
//  

function AppDataTable() {
  const { ref: targetRef, skip } = useIsVisible();

  const [state, dispatch] = useReducer(reducer, {
    total: 0,
    limit: 10,
    data: [],
    query: "",
    loading: true,
  });

  const fetchPaginatedData = useCallback(async () => {
    const { userData, total } = await getData(state.limit, skip);

    dispatch({
      type: ACTIONS.UPDATE_DATA,
      payload: [...state.data, ...userData],
    });
    dispatch({ type: ACTIONS.SET_TOTAL, payload: total });
    dispatch({ type: ACTIONS.TOGGLE_LOADING, payload: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.limit, skip]);

  const fetchFilteredData = useCallback(async () => {
    const { userData, total } = await getData(skip, 0, state.query);

    dispatch({ type: ACTIONS.UPDATE_DATA, payload: userData });
    dispatch({ type: ACTIONS.SET_TOTAL, payload: total });
    dispatch({ type: ACTIONS.TOGGLE_LOADING, payload: false });
  }, [skip, state.query]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (state.query) return;
      fetchPaginatedData();
    }, 2000);
    return () => clearTimeout(timeout);
  }, [fetchPaginatedData, state.query]);

  useEffect(() => {
    if (state.query) {
      fetchFilteredData();
      fetchFilteredData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchFilteredData]);

  const columns = GetColumns();
  return (
    <>
      <Searchbox
        query={state.query}
        setQuery={(newQuery) =>
          dispatch({ type: ACTIONS.UPDATE_QUERY, payload: newQuery })
        }
        handleAddData={(values) => {
          dispatch({ type: ACTIONS.ADD_ROW, payload: values });
        }}
      />
      {state.loading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <Loader2 size={30} className="animate-spin" />
        </div>
      ) : (
        <DataTable
          data={state.data}
          columns={columns}
          limit={state.limit}
          total={state.total}
          targetRef={targetRef}
          setLimit={(newLimit) =>
            dispatch({ type: ACTIONS.SET_LIMIT, payload: newLimit })
          }
        />
      )}
    </>
  );
}

export default AppDataTable;
