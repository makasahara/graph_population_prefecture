import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorCatcher from "./index";
import { errorText } from "../error";
const ErrorComponent = () => {
  throw new Error("Error Component");
};

const SafeComponent = () => {
  return <div>Safe Component</div>;
};

describe("ErrorCatcher", () => {
  const originalConsoleError = console.error;
  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  const renderErrorCatcher = (children: React.ReactNode) => {
    return render(<ErrorCatcher>{children}</ErrorCatcher>);
  };

  it("エラーが発生したときにフォールバックUIを表示する", async () => {
    renderErrorCatcher(<ErrorComponent />);
    await expect(screen.getByText(errorText)).toBeInTheDocument();
  });

  it("エラーが発生していない場合は、フォールバックUIを表示しない", async () => {
    renderErrorCatcher(<SafeComponent />);
    await expect(screen.queryByText(errorText)).not.toBeInTheDocument();
  });
});
