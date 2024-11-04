import axios from "axios";
import { getPrefectures, getPopulation, clearPopulationCache } from "./api";
import type { PopulationType, PopulationCategory } from "./types";
import { resasApiBaseEndpoint } from "./define";

type MockPopulationDataType = {
  message: null;
  result: { boundaryYear: number; data: PopulationType[] };
};

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockApiKey = "mock_api_key";

beforeAll(() => {
  process.env.VITE_RESAS_API_KEY = mockApiKey;
});

const headers = {
  "X-API-KEY": mockApiKey,
};

const mockPrefecturesData = {
  result: [
    { prefCode: 1, prefName: "北海道" },
    { prefCode: 2, prefName: "青森" },
  ],
};

const mockPopulationData = [
  {
    message: null,
    result: {
      boundaryYear: 2020,
      data: [
        {
          label: "総人口" as PopulationCategory,
          data: [
            { year: 2020, value: 1000000 },
            { year: 2021, value: 1005000 },
          ],
        },
        {
          label: "年少人口" as PopulationCategory,
          data: [
            { year: 2020, value: 50000, rate: 22.67 },
            { year: 2021, value: 51000, rate: 22.77 },
          ],
        },
      ],
    },
  },
  {
    message: null,
    result: {
      boundaryYear: 2020,
      data: [
        {
          label: "総人口" as PopulationCategory,
          data: [
            { year: 2020, value: 2000000 },
            { year: 2021, value: 2005000 },
          ],
        },
        {
          label: "年少人口" as PopulationCategory,
          data: [
            { year: 2020, value: 60000, rate: 12.67 },
            { year: 2021, value: 61000, rate: 12.77 },
          ],
        },
      ],
    },
  },
];

describe("API functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getPrefectures", () => {
    it("「都道府県一覧」データが取得できていること", async () => {
      mockedAxios.get.mockResolvedValue({ data: mockPrefecturesData });

      const result = await getPrefectures();

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${resasApiBaseEndpoint}api/v1/prefectures`,
        { headers },
      );
      expect(result).toEqual(mockPrefecturesData.result);
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });
  });

  describe("getPopulation", () => {
    function setupMockGet(responseData: MockPopulationDataType[]) {
      responseData.forEach((data) => {
        mockedAxios.get.mockResolvedValueOnce({ data });
      });
    }

    it("都道府県コードに対応した人口構成データが取得できていること", async () => {
      setupMockGet(mockPopulationData);

      const prefCodes = ["1", "2"];
      const populationData = await getPopulation(prefCodes);

      prefCodes.forEach((prefCode, index) => {
        expect(mockedAxios.get).toHaveBeenCalledWith(
          `${resasApiBaseEndpoint}api/v1/population/composition/perYear?prefCode=${prefCode}&cityCode=-`,
          { headers },
        );
        expect(populationData[prefCode]).toEqual(
          mockPopulationData[index].result.data,
        );
      });

      expect(mockedAxios.get).toHaveBeenCalledTimes(prefCodes.length);
    });

    it("都道府県コードに対応した人口構成データを取得した後はAPIを実行しないこと", async () => {
      clearPopulationCache();

      setupMockGet(mockPopulationData);

      const prefCodes1 = ["1"];
      await getPopulation(prefCodes1);
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);

      mockedAxios.get.mockClear();

      const prefCodes2 = ["1", "2"];
      await getPopulation(prefCodes2);
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);

      mockedAxios.get.mockClear();

      const prefCodes3 = ["1", "2"];
      await getPopulation(prefCodes3);
      expect(mockedAxios.get).toHaveBeenCalledTimes(0);
    });
  });
});
