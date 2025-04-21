import axios from "axios";

const URL_API =
  "https://gdp-prd-clube.s3.amazonaws.com/api/repository/partners/all.json";

export async function fetchAllData() {
  try {
    const response = await axios.get(`${URL_API}`);

    return response.data;
  } catch (error) {
    return error;
  }
}
