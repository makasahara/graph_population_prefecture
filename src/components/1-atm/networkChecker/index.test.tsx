import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import NetworkChecker from "./index";

const renderNetworkChecker = () => {
  return render(
    <NetworkChecker>
      <div>オンラインコンテンツ</div>
    </NetworkChecker>,
  );
};

describe("NetworkChecker", () => {
  it("オンライン状態で子コンポーネントを表示する", () => {
    Object.defineProperty(window.navigator, "onLine", {
      writable: true,
      value: true,
    });
    renderNetworkChecker();
    expect(screen.getByText("オンラインコンテンツ")).toBeInTheDocument();
  });

  it("オフライン状態でエラーメッセージを表示する", () => {
    Object.defineProperty(window.navigator, "onLine", {
      writable: true,
      value: false,
    });

    renderNetworkChecker();

    expect(
      screen.getByText("ネットワークがオフラインです"),
    ).toBeInTheDocument();
  });

  it("オンライン・オフラインのイベントを正しく処理する", async () => {
    Object.defineProperty(window.navigator, "onLine", {
      writable: true,
      value: true,
    });

    renderNetworkChecker();

    // オフラインイベントをシミュレート
    await act(async () => {
      window.dispatchEvent(new Event("offline"));
    });
    await waitFor(() => {
      expect(
        screen.getByText("ネットワークがオフラインです"),
      ).toBeInTheDocument();
    });

    // オンラインイベントをシミュレート
    await act(async () => {
      window.dispatchEvent(new Event("online"));
    });
    await waitFor(() => {
      expect(screen.getByText("オンラインコンテンツ")).toBeInTheDocument();
    });
  });
});
