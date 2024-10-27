import axios from "axios";
import { getPrefectures, getPopulation } from "./api";
import { resasApiBaseEndpoint } from "./define";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockApiKey = 'mock_api_key';

beforeAll(() => {
  process.env.VITE_RESAS_API_KEY = mockApiKey;
});

const headers = {
  "X-API-KEY": mockApiKey,
};

describe("API functions", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getPrefectures", () => {
    it("「都道府県一覧」データが取得できていること", async () => {
      const mockData = {
        result: [
          { prefCode: 1, prefName: "北海道" },
          { prefCode: 2, prefName: "青森" },
        ],
      };
      mockedAxios.get.mockResolvedValue({ data: mockData });

      const result = await getPrefectures();

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${resasApiBaseEndpoint}api/v1/prefectures`,
        { headers },
      );
      expect(result).toEqual(mockData.result);
    });
  });

  describe("getPopulation", () => {
    it("都道府県コードに対応した人口構成データが取得できていること", async () => {
      const mockData = { result: { data: [] } };
      mockedAxios.get.mockResolvedValue({ data: mockData });

      const prefCodes = ["1", "2"];
      await getPopulation(prefCodes);

      prefCodes.forEach((prefCode) => {
        expect(mockedAxios.get).toHaveBeenCalledWith(
          `${resasApiBaseEndpoint}api/v1/population/composition/perYear?prefCode=${prefCode}&cityCode=-`,
          { headers },
        );
      });
    });
  });
});