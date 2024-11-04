import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import TitleArea from "./index";

describe("TitleArea", () => {
  it("Headingコンポーネントの子要素が表示されていること", () => {
    const { getByText } = render(
      <TitleArea>
        <span>Test Title</span>
      </TitleArea>,
    );
    expect(getByText("Test Title")).toBeInTheDocument();
  });
});
