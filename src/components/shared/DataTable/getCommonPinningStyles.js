export const getCommonPinningStyles = (column) => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    opacity: isPinned ? 1 : 1,
    position: isPinned ? "sticky" : "relative",
    zIndex: isPinned ? 1 : 0,
    // width: column.getSize(),
    width: column.columnDef?.size,
    minWidth: column.columnDef?.minSize,
    maxWidth: column.columnDef?.maxSize,
    //column resize
    // transform: column.getIsResizing()
    //   ? `translateX(${table.getState().columnSizingInfo.deltaOffset}px)`
    //   : '',
    boxShadow: isLastLeftPinnedColumn
      ? "-1px 0 0 0 #d3d3d3 inset"
      : isFirstRightPinnedColumn
      ? "1px 0 0 0 #d3d3d3 inset"
      : undefined,
  };
};
