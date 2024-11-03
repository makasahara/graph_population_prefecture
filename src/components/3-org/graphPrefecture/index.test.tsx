import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import "@testing-library/jest-dom";
import GraphPrefecture from "./index";
import { getPopulation, getPrefectures } from "../../../util/api/api";
import type { PopulationType } from "../../../util/api/types";
import { restoreConsoleWarn } from "../../../setupTests/setupGraphTest";

jest.mock("../../../util/api/api", () => ({
  getPopulation: jest.fn(),
  getPrefectures: jest.fn(),
}));

const mockPrefectures = [
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

const queryClient = new QueryClient();

const renderGraphPrefecture = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <GraphPrefecture prefectureCodes={["1"]} category="総人口" />
    </QueryClientProvider>,
  );
};

describe("GraphPrefecture", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    (getPrefectures as jest.Mock).mockResolvedValue(mockPrefectures);
    (getPopulation as jest.Mock).mockResolvedValue(mockPopulationData);
  });

  afterAll(() => {
    restoreConsoleWarn();
  });

  it("都道府県のデータと人口構成データが取得されていること", async () => {
    renderGraphPrefecture();
    await waitFor(() => {
      expect(getPopulation).toHaveBeenCalledWith(["1"]);
      expect(getPrefectures).toHaveBeenCalled();
    });
  });

  it("セレクトボックスが表示されていること", async () => {
    renderGraphPrefecture();
    await waitFor(() => {
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });
  });

  it("セレクトボックスの値が変更されたこと", async () => {
    renderGraphPrefecture();

    await waitFor(() => {
      const selectBox = screen.getByRole("combobox");
      user.selectOptions(selectBox, "年少人口");
      expect(selectBox).toHaveValue("年少人口");
    });
  });
});
