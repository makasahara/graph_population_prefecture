import FormPrefecture from "../../3-org/formPrefecture";
import GraphPrefecture from "../../3-org/graphPrefecture";
import type { HandlePrefectureCodes } from "../../5-pg/topPg/types";

const TopTmpl = ({
  handlePrefectureCodes,
  prefectureCodes,
}: {
  handlePrefectureCodes: HandlePrefectureCodes;
  prefectureCodes: string[];
}) => {
  return (
    <>
      <FormPrefecture handlePrefectureCodes={handlePrefectureCodes} />
      <GraphPrefecture prefectureCodes={prefectureCodes} />
    </>
  );
};

export default TopTmpl;
