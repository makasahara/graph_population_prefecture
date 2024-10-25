import axios from "axios";
import type { PrefectureType } from "./types";
import { resasApiBaseEndpoint } from "./define";

const getPrefectures = async (): Promise<PrefectureType[]> => {
  const data = await getData(generateUrl("api/v1/prefectures"));
  console.log("api/v1/prefectures"); // 実行時のログとして出力
  console.log(data); // データをログとして出力
  return data.result;
};

const getPopulation = async (prefCodes: string[]) => {
  for (const prefCode of prefCodes) {
    const data = await getData(
      generateUrl(
        "api/v1/population/composition/perYear",
        `prefCode=${prefCode}&cityCode=-`,
      ),
    );
    console.log("api/v1/population/composition/perYear"); // 実行時のログとして出力
    console.log(data); // データをログとして出力
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
