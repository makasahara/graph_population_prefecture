import axios from "axios";
import type { PrefectureType, PopulationType } from "./types";
import { resasApiBaseEndpoint } from "./define";

// 都道府県のリストをキャッシュする
const prefectureCache: PrefectureType[] = [];

// 人口構成データをキャッシュする
const populationCache: Record<string, PopulationType[]> = {};

/**
 * 都道府県のリストを取得する非同期関数。
 *
 * この関数は、指定されたエンドポイントから都道府県のデータを取得し、
 * その結果を`PrefectureType`の配列として返します。
 *
 * @returns {Promise<PrefectureType[]>} 都道府県のリストを含むPromise。
 * @throws {Error} データの取得に失敗した場合にエラーをスローします。
 */
const getPrefectures = async (): Promise<PrefectureType[]> => {
  if (prefectureCache.length === 0) {
    const data = await fetchData(generateEndpoint("api/v1/prefectures"));
    prefectureCache.push(...data.result);
  }
  return prefectureCache;
};

/**
 * 人口構成データのキャッシュをクリアする関数。
 *
 * この関数は、`populationCache`オブジェクト内のすべてのキーを削除し、
 * キャッシュされた人口構成データをクリアします。
 *
 * @returns {void} この関数は値を返しません。
 */
const clearPopulationCache = () => {
  Object.keys(populationCache).forEach((key) => delete populationCache[key]);
};

/**
 * 指定された都道府県コードの人口構成データを取得する非同期関数。
 *
 * この関数は、与えられた都道府県コードの配列に基づいて、
 * 各都道府県の人口構成データを取得し、キャッシュを利用して効率的にデータを返します。
 *
 * @param {string[]} prefCodes - 人口構成データを取得するための都道府県コードの配列。
 * @returns {Promise<Record<string, PopulationType[]>>} 都道府県コードをキーとする人口構成データのレコードを含むPromise。
 * @throws {Error} データの取得に失敗した場合にエラーをスローします。
 */
const getPopulation = async (
  prefCodes: string[],
): Promise<Record<string, PopulationType[]>> => {
  const data: Record<string, PopulationType[]> = {};
  for (const prefCode of prefCodes) {
    if (!populationCache[prefCode]) {
      populationCache[prefCode] = await getEachPopulation(prefCode);
    }

    data[prefCode] = populationCache[prefCode];
  }
  return data;
};

/**
 * 指定された都道府県コードの人口構成データを取得する非同期関数。
 *
 * この関数は、特定の都道府県コードに基づいて、
 * 年ごとの人口構成データを取得します。
 *
 * @param {string} prefCode - 人口構成データを取得するための都道府県コード。
 * @returns {Promise<PopulationType[]>} 指定された都道府県の人口構成データを含むPromise。
 * @throws {Error} データの取得に失敗した場合にエラーをスローします。
 */
const getEachPopulation = async (
  prefCode: string,
): Promise<PopulationType[]> => {
  const data = await fetchData(
    generateEndpoint(
      "api/v1/population/composition/perYear",
      `prefCode=${prefCode}&cityCode=-`,
    ),
  );
  return data.result.data;
};

/**
 * APIエンドポイントURLを生成する関数。
 *
 * この関数は、指定されたパスパラメータとクエリパラメータを使用して、
 * 完全なAPIエンドポイントURLを生成します。
 *
 * @param {string} pathParameters - エンドポイントのパス部分を指定する文字列。
 * @param {string} [queryParameters=""] - エンドポイントのクエリパラメータを指定する文字列。デフォルトは空文字列。
 * @returns {string} 完全なAPIエンドポイントURL。
 */
const generateEndpoint = (
  pathParameters: string,
  queryParameters: string = "",
) => {
  const queryString = queryParameters ? `?${queryParameters}` : "";
  return `${resasApiBaseEndpoint}${pathParameters}${queryString}`;
};

/**
 * 指定されたエンドポイントからデータを取得する非同期関数。
 *
 * この関数は、指定されたAPIエンドポイントにGETリクエストを送り、
 * レスポンスデータを返します。リクエストにはAPIキーが含まれます。
 *
 * @param {string} endpoint - データを取得するためのAPIエンドポイントURL。
 * @returns {Promise<any>} 取得したデータを含むPromise。
 * @throws {Error} データの取得に失敗した場合にエラーをスローします。
 */
const fetchData = async (endpoint: string) => {
  const response = await axios.get(endpoint, {
    headers: {
      "X-API-KEY": process.env.VITE_RESAS_API_KEY,
    },
  });
  return response.data;
};

export { getPrefectures, getPopulation, clearPopulationCache };
