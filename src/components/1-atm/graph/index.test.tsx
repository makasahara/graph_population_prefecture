import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { css } from "@emotion/react";
import Graph from "./index";
import { restoreConsoleWarn } from "../../../setupTests/setupGraphTest";

const customContainerStyle = css({
  width: "300px",
  height: "300px",
  minWidth: "300px",
  minHeight: "300px",
});

describe("Graph", () => {
  const mockData = [
    { year: 2015, maxValue: 200, 埼玉県: 100, 東京都: 200 },
    { year: 2020, maxValue: 250, 埼玉県: 150, 東京都: 250 },
  ];

  const renderGraph = () => {
    return render(
      <Graph
        data={mockData}
        xAxisDataKey="year"
        yAxisDataKey="maxValue"
        customContainerStyle={customContainerStyle}
      />,
    );
  };

  afterAll(() => {
    restoreConsoleWarn();
  });

  it("グラフが描画されることを確認する", async () => {
    renderGraph();
    const graphContainer = screen.getByTestId("graph-container");
    expect(graphContainer).toBeInTheDocument();
  });

  it("ラインの数が正しく描画されている", () => {
    renderGraph();
    const lines = document.querySelectorAll(".recharts-line");
    expect(lines.length).toBe(2);
  });

  it("横軸と縦軸のラベルが正しく描画されている", () => {
    renderGraph();

    // 横軸の存在を確認
    const xAxis = document.querySelector(".recharts-xAxis");
    expect(xAxis).toBeInTheDocument();

    // 縦軸の存在を確認
    const yAxis = document.querySelector(".recharts-yAxis");
    expect(yAxis).toBeInTheDocument();

    // 横軸のラベルが正しいことを確認
    const xAxisLabels = xAxis?.querySelectorAll(
      ".recharts-cartesian-axis-tick-value",
    );
    expect(xAxisLabels?.[0].textContent).toBe(mockData[0].year.toString());
    expect(xAxisLabels?.[1].textContent).toBe(mockData[1].year.toString());

    // 縦軸のラベルが正しいことを確認
    const yAxisLabels = yAxis?.querySelectorAll(
      ".recharts-cartesian-axis-tick-value",
    );
    expect(yAxisLabels?.[0].textContent).toBe("0");
    expect(
      Number(yAxisLabels?.[yAxisLabels.length - 1].textContent),
    ).toBeGreaterThan(Number(mockData[mockData.length - 1].maxValue));
  });

  it("凡例のラベルが正しく描画されている", () => {
    renderGraph();

    const legendItems = document.querySelectorAll(".recharts-legend-item-text");

    const expectedLabels = Object.keys(mockData[0]).filter(
      (key) => key !== "year" && key !== "maxValue",
    );

    expectedLabels.forEach((label, index) => {
      expect(legendItems[index].textContent).toBe(label);
    });
  });
});
