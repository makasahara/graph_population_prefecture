import { render, screen } from "@testing-library/react";
import TopPg from "./index";

const topTmplMockText = "TopTmpl Component";

jest.mock("../../4-tmpl/topTmpl", () => <div>{topTmplMockText}</div>);

describe("TopPg", () => {
  it("TopTmplが表示されること", () => {
    render(<TopPg />);
    expect(screen.getByText(topTmplMockText)).toBeInTheDocument();
  });
});
