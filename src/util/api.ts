import axios from "axios";
import { resasApiBaseEndpoint } from "./define";

const getPrefectures = async () => {
  const data = await getData(generateUrl("api/v1/prefectures"));
  console.log(data);
};

const getPopulation = async (prefCodes: string[]) => {
  for (const prefCode of prefCodes) {
    const data = await getData(
      generateUrl(
        "api/v1/population/composition/perYear",
        `prefCode=${prefCode}&cityCode=-`,
      ),
    );
    console.log(data);
  }
};

const generateUrl = (pathParameters: string, queryParameters: string = "") => {
  return `${resasApiBaseEndpoint}${pathParameters}?${queryParameters}`;
};

const getData = async (url: string) => {
  const response = await axios.get(url, {
    headers: {
      "X-API-KEY": import.meta.env.VITE_RESAS_API_KEY,
    },
  });
  return response.data;
};

export { getPrefectures, getPopulation };
