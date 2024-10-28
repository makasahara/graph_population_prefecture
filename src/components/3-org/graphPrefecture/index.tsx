import { useQuery } from "react-query";
import Graph from "../../1-atm/graph";
import { getPopulation, getPrefectures } from "../../../util/api/api";
import { populationDataForGraph } from "./functions";
import type { PopulationCategory } from "../../../util/api/types";
import { customContainerStyle } from "./styles";
import prefectureColors from "./colors";

type GraphPrefectureType = {
  prefectureCodes: string[];
  category: PopulationCategory;
};

const GraphPrefecture = ({
  prefectureCodes,
  category,
}: GraphPrefectureType) => {
  const { data: populationData, isFetching: isPopulationFetching } = useQuery(
    ["Population", [prefectureCodes]],
    () => getPopulation(prefectureCodes),
    {
      staleTime: 0,
    },
  );

  const { data: prefectureData } = useQuery(
    ["Prefectures"],
    () => getPrefectures(),
    {
      staleTime: Infinity,
    },
  );

  let dataForGraph: { year: number; [key: string]: number }[] = [];

  if (populationData && prefectureData) {
    dataForGraph = populationDataForGraph({
      populationData,
      prefectureData,
      category,
    });
  }

  return (
    dataForGraph.length > 0 &&
    !isPopulationFetching && (
      <Graph
        data={dataForGraph}
        xAxisDataKey="year"
        yAxisDataKey="maxValue"
        customContainerStyle={customContainerStyle}
        margin={{
          top: 10,
          right: 10,
          left: 30,
          bottom: 10,
        }}
        colors={prefectureColors}
      />
    )
  );
};

export default GraphPrefecture;
