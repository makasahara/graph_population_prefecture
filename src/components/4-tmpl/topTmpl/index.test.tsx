import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TopTmpl from "./index";

const formPrefectureMockText = "FormPrefecture Component";
const graphPrefectureMockText = "GraphPrefecture Component";

jest.mock("../../3-org/formPrefecture", () => {
  return jest.fn(() => <div>{formPrefectureMockText}</div>);
});

jest.mock("../../3-org/graphPrefecture", () => {
  return jest.fn(() => <div>{graphPrefectureMockText}</div>);
});

describe("TopTmpl", () => {

  const mockFn = jest.fn();

  const renderTopTmpl = (prefectureCodes: string[]) => {
    return render(
      <TopTmpl
        handlePrefectureCodes={mockFn}
        prefectureCodes={prefectureCodes}
      />,
    );
  };

  it("prefectureCodesに値が入っているときには、FormPrefectureとGraphPrefectureが表示されること", () => {
    const prefectureCodes = ["1", "2"];

    renderTopTmpl(prefectureCodes);

    expect(screen.getByText(formPrefectureMockText)).toBeInTheDocument();
    expect(screen.getByText(graphPrefectureMockText)).toBeInTheDocument();
  });

  it("prefectureCodesに値が入っていないときには、FormPrefectureのみが表示されること", () => {
    const prefectureCodes: string[] = [];

    renderTopTmpl(prefectureCodes);

    expect(screen.getByText(formPrefectureMockText)).toBeInTheDocument();
    expect(screen.queryByText(graphPrefectureMockText)).not.toBeInTheDocument();
  });

});
