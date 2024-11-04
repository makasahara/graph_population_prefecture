/** @jsxImportSource @emotion/react */
import type { SerializedStyles } from "@emotion/react";
import { checkboxStyle, labelStyle, handleKeyDown } from "./styles";

const Checkbox = ({
  id,
  name,
  value,
  customContainerStyle,
  children,
  onChange,
}: {
  id: string;
  name: string;
  value: string;
  customContainerStyle?: SerializedStyles;
  children: React.ReactNode;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <label css={[labelStyle, customContainerStyle]} key={id}>
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        css={checkboxStyle}
        onKeyDown={handleKeyDown}
      />
      {children}
    </label>
  );
};

export default Checkbox;
