import type {
  PrefectureType,
  PopulationType,
  PopulationCategory,
} from "../../../util/api/types";

type ProcessPopulationDataType = {
  populationData: Record<string, PopulationType[]>;
  prefectureData: PrefectureType[];
};

type PopulationDataForGraphType = ProcessPopulationDataType & {
  category: PopulationCategory;
};

/**
 * 指定された都道府県の人口構成データを処理し、グラフ表示用のデータを生成します。
 *
 * @param {Object} params - 関数のパラメータオブジェクト。
 * @param {Record<string, PopulationType[]>} params.populationData - 各都道府県の人口構成データのレコード。
 * @param {PrefectureType[]} params.prefectureData - 都道府県の情報を含む配列。
 * @param {PopulationCategory} params.category - フィルタリングするカテゴリ。
 * @returns {Array<Object>} グラフ表示用に整形された人口構成データの配列。各オブジェクトは年ごとのデータを含みます。
 */
const populationDataForGraph = ({
  populationData,
  prefectureData,
  category,
}: PopulationDataForGraphType) => {
  const processedData = processPopulationData({
    populationData,
    prefectureData,
  });

  return processedData
    .filter(({ label }) => label === category)
    .reduce(
      (acc, { year, value, prefName }) => {
        const yearData = acc.find((data) => data.year === year) || {
          year,
          maxValue: value,
        };
        if (!acc.includes(yearData)) {
          acc.push(yearData);
        }
        yearData[prefName] = value;
        yearData.maxValue = Math.max(yearData.maxValue, value);
        return acc;
      },
      [] as { year: number; maxValue: number; [key: string]: number }[],
    );
};

/**
 * 都道府県の人口構成データを処理し、データを各年ごとにフラットな配列として整形します。
 *
 * @param {Object} params - 関数のパラメータオブジェクト。
 * @param {Record<string, PopulationType[]>} params.populationData - 各都道府県の人口データのレコード。
 * @param {PrefectureType[]} params.prefectureData - 都道府県の情報を含む配列。
 * @returns {Array<Object>} 各年ごとの人口構成データを含むオブジェクトの配列。各オブジェクトには年、値、ラベル、都道府県コード、都道府県名が含まれます。
 * @throws {Error} 都道府県の情報が見つからない場合にエラーをスローします。
 */
const processPopulationData = ({
  populationData,
  prefectureData,
}: ProcessPopulationDataType) => {
  return Object.entries(populationData).flatMap(([code, populations]) => {
    const prefectureObject = prefectureData.find(
      ({ prefCode }) => prefCode === Number(code),
    );

    if (!prefectureObject) {
      throw new Error("都道府県の値が取得できませんでした。");
    }

    return populations.flatMap(({ label, data }) =>
      data.map(({ year, value }) => ({
        year,
        value,
        label,
        prefCode: prefectureObject.prefCode,
        prefName: prefectureObject.prefName,
      })),
    );
  });
};

export { populationDataForGraph, processPopulationData };
