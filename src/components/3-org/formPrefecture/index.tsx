/** @jsxImportSource @emotion/react */
import { useQuery } from "react-query";
import Checkbox from "../../1-atm/checkbox";
import Text from "../../1-atm/text";
import { containerStyle, checkboxStyle } from "./styles";
import { getPrefectures } from "../../../util/api/api";
import type { PrefectureType } from "../../../util/api/types";
import { HandlePrefectureCodes } from "../../5-pg/topPg/types";

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
      {data &&
        data.map((prefecture: PrefectureType) => (
          <Checkbox
            key={String(prefecture.prefCode)}
            name="prefecture"
            id={`prefecture-${prefecture.prefCode}`}
            value={String(prefecture.prefCode)}
            style={checkboxStyle}
            onChange={handlePrefectureCodes}
          >
            <Text>{prefecture.prefName}</Text>
          </Checkbox>
        ))}
    </div>
  );
};

export default FormPrefecture;
