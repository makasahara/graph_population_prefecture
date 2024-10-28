import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import "@testing-library/jest-dom";
import FormPrefecture from "./index";
import { getPrefectures } from "../../../util/api/api";

jest.mock("../../../util/api/api");

const mockPrefectures = [
  { prefCode: 1, prefName: "北海道" },
  { prefCode: 2, prefName: "青森県" },
];

describe("FormPrefecture", () => {
  const queryClient = new QueryClient();
  const mockFn = jest.fn();
  const user = userEvent.setup();

  const renderFormPrefecture = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <FormPrefecture handlePrefectureCodes={mockFn} />
      </QueryClientProvider>,
    );
  };

  beforeEach(() => {
    (getPrefectures as jest.Mock).mockResolvedValue(mockPrefectures);
    mockFn.mockClear();
  });

  it("「都道府県一覧」データを元にチェックボックスが表示されること", async () => {
    renderFormPrefecture();
    await waitFor(() => {
      mockPrefectures.forEach((prefecture) => {
        expect(screen.getByLabelText(prefecture.prefName)).toBeInTheDocument();
        const checkbox = screen.getByRole("checkbox", {
          name: prefecture.prefName,
        });
        expect(checkbox).not.toBeChecked();
      });
    });
  });

  it("チェックボックスをクリックするとチェックがされ、関数が呼ばれること", async () => {
    renderFormPrefecture();
    const checkbox = screen.getByRole("checkbox", {
      name: mockPrefectures[0].prefName,
    });
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("チェックボックスを2回クリックするとチェックが外れ、関数が呼ばれること", async () => {
    renderFormPrefecture();
    const checkbox = screen.getByRole("checkbox", {
      name: mockPrefectures[0].prefName,
    });
    await user.click(checkbox);
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});
