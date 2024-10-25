import { useState } from "react";
import TopTmpl from "../../4-tmpl/topTmpl";
import type { HandlePrefectureCodes } from "./types";

const TopPg = () => {
  const [prefectureCodes, setPrefectureCodes] = useState<string[]>([]);

  const handlePrefectureCodes: HandlePrefectureCodes = (event) => {
    const code = event.target.value;
    setPrefectureCodes((prev) => {
      if (prev.includes(code)) {
        return prev.filter((p) => p !== code);
      }
      return [...prev, code];
    });
  };
  return (
    <TopTmpl
      handlePrefectureCodes={handlePrefectureCodes}
      prefectureCodes={prefectureCodes}
    />
  );
};

export default TopPg;
