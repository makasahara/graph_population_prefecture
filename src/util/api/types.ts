import type { populationCategory } from "./define";

type PrefectureType = {
  prefCode: number;
  prefName: string;
};

type PopulationDataPoint = {
  year: number;
  value: number;
  rate?: number;
};

type PopulationCategory = (typeof populationCategory)[number];

type PopulationType = {
  label: PopulationCategory;
  data: PopulationDataPoint[];
};

export type { PrefectureType, PopulationType, PopulationCategory };
