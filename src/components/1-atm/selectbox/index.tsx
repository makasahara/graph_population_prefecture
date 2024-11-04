/** @jsxImportSource @emotion/react */
import type { SerializedStyles } from "@emotion/react";
import { selectBoxStyle } from "./style";

const SelectBox = ({
  id,
  name,
  values,
  selectedValue,
  customContainerStyle,
  onChange,
}: {
  id: string;
  name: string;
  values: {
    value: string;
    label: string;
  }[];
  selectedValue?: string;
  customContainerStyle?: SerializedStyles;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <label css={[selectBoxStyle, customContainerStyle]}>
      <select
        id={id}
        name={name}
        value={selectedValue}
        onChange={onChange}
        key={id}
      >
        {values.map((value) => (
          <option value={value.value} key={value.value}>
            {value.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SelectBox;
