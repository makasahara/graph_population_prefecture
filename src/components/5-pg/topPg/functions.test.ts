import { changePrefectureCode } from "./functions";

describe("changePrefectureCode", () => {
  it("空の状態の配列への追加を行う", () => {
    const codes: string[] = [];
    const codeToAdd = "1";
    const result = changePrefectureCode(codes, codeToAdd);
    expect(result).toEqual(["1"]);
  });

  it("配列への追加を行う", () => {
    const codes: string[] = ["1"];
    const codeToAdd = "2";
    const result = changePrefectureCode(codes, codeToAdd);
    expect(result).toEqual(["1", "2"]);
  });

  it("配列から削除を行う", () => {
    const codes = ["1", "2", "3"];
    const codeToRemove = "2";
    const result = changePrefectureCode(codes, codeToRemove);
    expect(result).toEqual(["1", "3"]);
  });
});
