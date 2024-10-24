import { getPrefectures, getPopulation } from "../../../util/api";

const TopPage = () => {
  const prefectures = getPrefectures();
  console.log(prefectures);
  const population = getPopulation(["13"]);
  console.log(population);
  return <div>TopPage</div>;
};

export default TopPage;
