export const getData = async (limit, skip, query) => {
  try {
    const response = await fetch("/data.json");
    const data = await response.json();
    let filterData = data.Data;
    if (query) {
      filterData = filterData.filter((val) =>
        val.data.currentPlatform.instanceType.startsWith(query)
      );
    }
    const userData = filterData
      .splice(skip, limit)
      .map((val, idx) => ({ ...val, id: String(skip + idx) }));
    return { userData, total: filterData.length };
  } catch (error) {
    console.log("error: unable to fetch data file", error);
  }
};
