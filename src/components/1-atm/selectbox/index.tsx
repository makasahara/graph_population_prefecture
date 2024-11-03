/** @jsxImportSource @emotion/react */
import type { SerializedStyles } from "@emotion/react";

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
    <div css={customContainerStyle} key={id}>
      <select id={id} name={name} value={selectedValue} onChange={onChange}>
        {values.map((value) => (
          <option value={value.value} key={value.value}>
            {value.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
