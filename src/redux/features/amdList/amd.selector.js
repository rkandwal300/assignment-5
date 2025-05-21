import { createSelector } from "@reduxjs/toolkit";

export const selectAmdListState = (state) => state.amdList;

export const selectAmdData = createSelector(
  selectAmdListState,
  (amdList) => amdList.data
);
export const selectAmdSearchQuery = createSelector(
  selectAmdListState,
  (amdList) => amdList.query
);
export const selectAmdLimit = createSelector(
  selectAmdListState,
  (amdList) => amdList.limit
);
export const selectAmdStartingIndex = createSelector(
  selectAmdListState,
  (amdList) => amdList.startIndex
);

export const selectAmdTotal = createSelector(
  selectAmdListState,
  (amdList) => amdList.total
);

export const selectAmdCurrent = createSelector(
  selectAmdListState,
  (amdList) => amdList.current
);

export const selectAmdLoading = createSelector(
  selectAmdListState,
  (amdList) => amdList.loading
);

export const selectAmdError = createSelector(
  selectAmdListState,
  (amdList) => amdList.error
);
