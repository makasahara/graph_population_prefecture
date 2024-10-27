import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Error, { errorText } from "./index";

describe("Error", () => {

  it("エラーが表示される", () => {
    render(
      <Error />
    );
    expect(screen.getByText(errorText)).toBeInTheDocument();
  });

});
