import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Heading from "./index";

const text = "テキストメッセージ";

describe("Text", () => {
  it("テキストが表示される", () => {
    render(<Heading>{text}</Heading>);
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
