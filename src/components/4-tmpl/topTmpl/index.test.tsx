import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TopTmpl from "./index";
import type { Children } from "../../../util/types";

const formPrefectureMockText = "FormPrefecture";
const graphPrefectureMockText = "GraphPrefecture";

jest.mock("../../1-atm/loadingBoundary", () => {
  const MockLoadingBoundary = ({ children }: { children: Children }) => (
    <div>{children}</div>
  );
  MockLoadingBoundary.displayName = "MockLoadingBoundary";
  return MockLoadingBoundary;
});

jest.mock("../../1-atm/errorCatcher", () => {
  const MockErrorCatcher = ({ children }: { children: Children }) => (
    <div>{children}</div>
  );
  MockErrorCatcher.displayName = "MockErrorCatcher";
  return MockErrorCatcher;
});

jest.mock("../../3-org/formPrefecture", () => {
  const MockFormPrefecture = () => <div>{formPrefectureMockText}</div>;
  MockFormPrefecture.displayName = "MockFormPrefecture";
  return MockFormPrefecture;
});

jest.mock("../../3-org/graphPrefecture", () => {
  const MockGraphPrefecture = () => <div>{graphPrefectureMockText}</div>;
  MockGraphPrefecture.displayName = "MockGraphPrefecture";
  return MockGraphPrefecture;
});

describe("TopTmpl", () => {
  const mockFn = jest.fn();
  it("FormPrefectureとGraphPrefectureが表示されること", () => {
    const prefectureCodes = ["1", "2"];

    render(
      <TopTmpl
        handlePrefectureCodes={mockFn}
        prefectureCodes={prefectureCodes}
      />,
    );

    expect(screen.getByText(formPrefectureMockText)).toBeInTheDocument();
    expect(screen.getByText(graphPrefectureMockText)).toBeInTheDocument();
  });
});
