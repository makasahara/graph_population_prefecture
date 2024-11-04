/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Graph from "../../1-atm/graph";
import SelectBox from "../../1-atm/selectbox";
import { getPopulation, getPrefectures } from "../../../util/api/api";
import { populationDataForGraph } from "./functions";
import { populationCategory } from "../../../util/api/define";
import type { PopulationCategory } from "../../../util/api/types";
import { containerStyleGraph, containerStyleSelectBox } from "./styles";
import prefectureColors from "./colors";

type GraphPrefectureType = {
  prefectureCodes: string[];
  category: PopulationCategory;
};

const GraphPrefecture = ({
  prefectureCodes,
  category,
}: GraphPrefectureType) => {
  const [selectedCategory, setSelectedCategory] =
    useState<PopulationCategory>(category);
  const [dataForGraph, setDataForGraph] = useState<
    { year: number; [key: string]: number }[]
  >([]);

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

  useEffect(() => {
    if (populationData && prefectureData) {
      const newDataForGraph = populationDataForGraph({
        populationData,
        prefectureData,
        category: selectedCategory,
      });
      setDataForGraph(newDataForGraph);
    }
  }, [selectedCategory, populationData, prefectureData]);

  const selectBoxValues = populationCategory.map((item) => ({
    value: item,
    label: item,
  }));

  const handleChangeCategory = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedCategory(event.target.value as PopulationCategory);
  };

  return (
    dataForGraph.length > 0 &&
    !isPopulationFetching && (
      <>
        <div css={containerStyleSelectBox}>
          <SelectBox
            id="category"
            name="category"
            values={selectBoxValues}
            selectedValue={selectedCategory}
            onChange={handleChangeCategory}
          />
        </div>
        <Graph
          data={dataForGraph}
          xAxisDataKey="year"
          xAxisLabel="年度"
          yAxisDataKey="maxValue"
          yAxisLabel="人口数"
          customContainerStyle={containerStyleGraph}
          margin={{
            top: 40,
            right: 60,
            left: 40,
            bottom: 10,
          }}
          colors={prefectureColors}
        />
      </>
    )
  );
};

export default GraphPrefecture;
