import LoadingBoundary from "../../1-atm/loadingBoundary";
import ErrorCatcher from "../../1-atm/errorCatcher";
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
      <LoadingBoundary>
        <ErrorCatcher>
          <FormPrefecture handlePrefectureCodes={handlePrefectureCodes} />
        </ErrorCatcher>
      </LoadingBoundary>
      <GraphPrefecture prefectureCodes={prefectureCodes} />
    </>
  );
};

export default TopTmpl;
