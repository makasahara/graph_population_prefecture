const changePrefectureCode = (codes: string[], code: string): string[] => {
  if (codes.includes(code)) {
    return codes.filter((p) => p !== code);
  }
  return [...codes, code];
};

export { changePrefectureCode };
