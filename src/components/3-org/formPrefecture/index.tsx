/** @jsxImportSource @emotion/react */
import { useQuery } from "react-query";
import Checkboxes from "../../2-mol/checkboxes";
import { getPrefectures } from "../../../util/api/api";
import { containerStyle, customCheckboxContainerStyle } from "./styles";
import type { HandlePrefectureCodes } from "../../5-pg/topPg/types";

const FormPrefecture = ({
  handlePrefectureCodes,
}: {
  handlePrefectureCodes: HandlePrefectureCodes;
}) => {
  const { data } = useQuery("Prefectures", getPrefectures, {
    staleTime: Infinity,
  });

  return (
    <div css={containerStyle}>
      {data && (
        <Checkboxes
          data={data.map((item) => ({
            id: item.prefCode,
            value: String(item.prefCode),
            label: item.prefName,
          }))}
          name="prefecture"
          customCheckboxContainerStyle={customCheckboxContainerStyle}
          onChange={handlePrefectureCodes}
        />
      )}
    </div>
  );
};

export default FormPrefecture;
