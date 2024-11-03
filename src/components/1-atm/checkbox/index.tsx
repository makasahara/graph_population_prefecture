/** @jsxImportSource @emotion/react */
import type { SerializedStyles } from "@emotion/react";
import { containerStyle } from "./styles";

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
    <div css={[containerStyle, customContainerStyle]} key={id}>
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={id}>{children}</label>
    </div>
  );
};

export default Checkbox;
