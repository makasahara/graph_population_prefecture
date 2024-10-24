/** @jsxImportSource @emotion/react */
import { v4 as uuid } from "uuid";
import type { SerializedStyles } from "@emotion/react";
import { containerStyle } from "./styles";
import type { OnChange, Children } from "../../../util/types";

const uniqueKey = uuid();

const Checkbox = ({
  id,
  name,
  value,
  style,
  children,
  onChange,
}: {
  id: string;
  name: string;
  value: string;
  style: SerializedStyles;
  children: Children;
  onChange: OnChange;
}) => {
  return (
    <div css={[containerStyle, style]} key={uniqueKey}>
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
