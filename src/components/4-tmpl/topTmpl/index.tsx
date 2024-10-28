/** @jsxImportSource @emotion/react */
import LoadingBoundary from "../../1-atm/loadingBoundary";
import ErrorCatcher from "../../1-atm/errorCatcher";
import FormPrefecture from "../../3-org/formPrefecture";
import GraphPrefecture from "../../3-org/graphPrefecture";
import {
  formContainerStyle,
  graphContainerStyle,
  loadingContainerStyle,
  errorContainerStyle,
} from "./styles";
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
      <LoadingBoundary customContainerStyle={loadingContainerStyle}>
        <ErrorCatcher customContainerStyle={errorContainerStyle}>
          <div css={formContainerStyle}>
            <FormPrefecture handlePrefectureCodes={handlePrefectureCodes} />
          </div>
        </ErrorCatcher>
      </LoadingBoundary>
      {prefectureCodes.length > 0 && (
        <LoadingBoundary customContainerStyle={loadingContainerStyle}>
          <ErrorCatcher customContainerStyle={errorContainerStyle}>
            <div css={graphContainerStyle}>
              <GraphPrefecture
                prefectureCodes={prefectureCodes}
                category="総人口"
              />
            </div>
          </ErrorCatcher>
        </LoadingBoundary>
      )}
    </>
  );
};

export default TopTmpl;
