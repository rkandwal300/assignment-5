export const getData = async (limit, skip) => {
  try {
    const response = await fetch("/data.json");
    const data = await response.json();
    const userData = data.Data.splice(skip, limit);
    return userData;
  } catch (error) {
    console.log("error: unable to fetch data file", error);
  }
};
