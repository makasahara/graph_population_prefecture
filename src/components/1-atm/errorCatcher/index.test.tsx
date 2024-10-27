import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import ErrorCatcher from "./index";
import { errorText } from "../error";

const ErrorComponent = () => {
  throw new Error("Test error");
};

describe("ErrorCatcher", () => {

  const originalConsoleError = console.error;
  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it("エラーが発生したときにフォールバックUIを表示する", async() => {

    render(
      <ErrorCatcher>
        <ErrorComponent />
      </ErrorCatcher>
    );

    await expect(screen.getByText(errorText)).toBeInTheDocument();
  });
});