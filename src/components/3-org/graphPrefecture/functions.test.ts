import { populationDataForGraph, processPopulationData } from "./functions";
import type {
  PrefectureType,
  PopulationType,
  PopulationCategory,
} from "../../../util/api/types";

const mockPrefectureData: PrefectureType[] = [
  { prefCode: 1, prefName: "北海道" },
  { prefCode: 2, prefName: "青森県" },
];

const mockPopulationData: Record<string, PopulationType[]> = {
  "1": [
    {
      label: "総人口",
      data: [
        { year: 2000, value: 1000 },
        { year: 2005, value: 1100 },
      ],
    },
    {
      label: "年少人口",
      data: [
        { year: 2000, value: 200 },
        { year: 2005, value: 220 },
      ],
    },
  ],
  "2": [
    {
      label: "総人口",
      data: [
        { year: 2000, value: 500 },
        { year: 2005, value: 550 },
      ],
    },
    {
      label: "年少人口",
      data: [
        { year: 2000, value: 100 },
        { year: 2005, value: 110 },
      ],
    },
  ],
};

describe("GraphPrefecture functions", () => {
  describe("populationDataForGraph", () => {
    const graphData = (category: PopulationCategory) => {
      return populationDataForGraph({
        populationData: mockPopulationData,
        prefectureData: mockPrefectureData,
        category,
      });
    };

    it("「総人口」カテゴリのデータのみを抽出し、整形できるかどうか", () => {
      const result = graphData("総人口");

      expect(result).toEqual([
        { year: 2000, maxValue: 1000, 北海道: 1000, 青森県: 500 },
        { year: 2005, maxValue: 1100, 北海道: 1100, 青森県: 550 },
      ]);
    });

    it("「年少人口」カテゴリのデータのみを抽出し、整形できるかどうか", () => {
      const result = graphData("年少人口");

      expect(result).toEqual([
        { year: 2000, maxValue: 200, 北海道: 200, 青森県: 100 },
        { year: 2005, maxValue: 220, 北海道: 220, 青森県: 110 },
      ]);
    });

    it("マッチするカテゴリがなかった場合に空の配列を返すか", () => {
      const result = graphData("非存在カテゴリ" as PopulationCategory);
      expect(result).toEqual([]);
    });
  });

  describe("processPopulationData", () => {
    const processData = (prefectureData: PrefectureType[]) => {
      return processPopulationData({
        populationData: mockPopulationData,
        prefectureData: prefectureData,
      });
    };

    it("データが正しく整形されるか", () => {
      const result = processData(mockPrefectureData);

      expect(result).toEqual([
        {
          year: 2000,
          value: 1000,
          label: "総人口",
          prefCode: 1,
          prefName: "北海道",
        },
        {
          year: 2005,
          value: 1100,
          label: "総人口",
          prefCode: 1,
          prefName: "北海道",
        },
        {
          year: 2000,
          value: 200,
          label: "年少人口",
          prefCode: 1,
          prefName: "北海道",
        },
        {
          year: 2005,
          value: 220,
          label: "年少人口",
          prefCode: 1,
          prefName: "北海道",
        },
        {
          year: 2000,
          value: 500,
          label: "総人口",
          prefCode: 2,
          prefName: "青森県",
        },
        {
          year: 2005,
          value: 550,
          label: "総人口",
          prefCode: 2,
          prefName: "青森県",
        },
        {
          year: 2000,
          value: 100,
          label: "年少人口",
          prefCode: 2,
          prefName: "青森県",
        },
        {
          year: 2005,
          value: 110,
          label: "年少人口",
          prefCode: 2,
          prefName: "青森県",
        },
      ]);
    });

    it("都道府県のデータが取得できない場合にエラーが発生するか", () => {
      const incompletePrefectureData: PrefectureType[] = [
        { prefCode: 1, prefName: "北海道" },
      ];

      expect(() => {
        processData(incompletePrefectureData);
      }).toThrow("都道府県の値が取得できませんでした。");
    });
  });
});
