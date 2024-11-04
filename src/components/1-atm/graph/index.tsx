/** @jsxImportSource @emotion/react */
import type { SerializedStyles } from "@emotion/react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { responsiveContainerStyle } from "./styles";

const Graph = ({
  data,
  xAxisDataKey,
  xAxisLabel,
  yAxisDataKey,
  yAxisLabel,
  customContainerStyle,
  margin,
  colors,
}: {
  data: { year: number; [key: string]: number }[];
  xAxisDataKey: string;
  xAxisLabel: string;
  yAxisDataKey: string;
  yAxisLabel: string;
  customContainerStyle?: SerializedStyles;
  margin?: {
    top: number;
    right: number;
    left: number;
    bottom: number;
  };
  colors?: { [key: string]: string };
}) => {
  return (
    <div css={customContainerStyle} data-testid="graph-container">
      <ResponsiveContainer css={responsiveContainerStyle}>
        <LineChart data={data} margin={margin}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={xAxisDataKey}
            label={{
              value: xAxisLabel,
              position: "insideRight",
              offset: -60,
              fill: "#666666",
              textAnchor: "end",
            }}
          />
          <YAxis
            dataKey={yAxisDataKey}
            label={{
              value: yAxisLabel,
              position: "insideTop",
              offset: -25,
              fill: "#666666",
              textAnchor: "right",
            }}
          />
          {Object.keys(data[0]).map((key) => {
            if (key !== xAxisDataKey && key !== yAxisDataKey) {
              return (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors?.[key] || "#8884d8"}
                />
              );
            }
          })}
          <Legend />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
