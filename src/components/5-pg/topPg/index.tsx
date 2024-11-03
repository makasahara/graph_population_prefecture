import { useState } from "react";
import TopTmpl from "../../4-tmpl/topTmpl";
import { changePrefectureCode } from "./functions";
import type { HandlePrefectureCodes } from "./types";

const TopPg = () => {
  const [prefectureCodes, setPrefectureCodes] = useState<string[]>([]);

  const handlePrefectureCodes: HandlePrefectureCodes = (event) => {
    const code = event.target.value;
    setPrefectureCodes((prev) => changePrefectureCode(prev, code));
  };

  return (
    <TopTmpl
      handlePrefectureCodes={handlePrefectureCodes}
      prefectureCodes={prefectureCodes}
    />
  );
};

export default TopPg;
