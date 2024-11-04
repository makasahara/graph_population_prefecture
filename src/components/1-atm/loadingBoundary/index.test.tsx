import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { lazy } from "react";
import type { ComponentType } from "react";
import LoadingBoundary from "./index";
import { loadingText } from "../loading";

const LazyComponent = lazy<ComponentType>(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ default: () => <div>Loaded Component</div> });
    }, 100);
  });
});

describe("LoadingBoundary", () => {
  const renderLoadingBoundary = () => {
    return render(
      <LoadingBoundary>
        <LazyComponent />
      </LoadingBoundary>,
    );
  };

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("読み込み中にフォールバックUIを表示する", async () => {
    renderLoadingBoundary();
    expect(screen.getByText(loadingText)).toBeInTheDocument();
  });

  it("読み込みが完了したら、コンポーネントを表示する", async () => {
    renderLoadingBoundary();
    expect(screen.getByText(loadingText)).toBeInTheDocument();
    jest.advanceTimersByTime(100);
    await screen.findByText("Loaded Component");
  });
});
