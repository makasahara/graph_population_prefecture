import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Loading, { loadingText } from "./index";

describe("Loading", () => {
  it("ローディングが表示される", () => {
    render(<Loading />);
    expect(screen.getByText(loadingText)).toBeInTheDocument();
  });
});
