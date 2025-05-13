export const getData = async (limit, skip) => {
  try {
    const response = await fetch("/data.json");
    const data = await response.json();
    const userData = data.Data.splice(skip, limit);
    return {userData, total: data.grandTotal.NumberOfInstances}
  } catch (error) {
    console.log("error: unable to fetch data file", error);
  }
};
 
