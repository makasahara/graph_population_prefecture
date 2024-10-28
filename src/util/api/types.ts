type PrefectureType = {
  prefCode: number;
  prefName: string;
};

type PopulationDataPoint = {
  year: number;
  value: number;
  rate?: number;
};

type PopulationCategory = "総人口" | "年少人口" | "生産年齢人口" | "老年人口";

type PopulationType = {
  label: PopulationCategory;
  data: PopulationDataPoint[];
};

export type { PrefectureType, PopulationType, PopulationCategory };
