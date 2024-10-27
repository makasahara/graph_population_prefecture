/** @jsxImportSource @emotion/react */
import type { SerializedStyles } from "@emotion/react";
import Checkbox from "../../1-atm/checkbox";
import Text from "../../1-atm/text";
import { containerStyle } from "./styles";
import type { OnChange } from "../../../util/types";

type Item = {
  id: number;
  value: string;
  label: string;
};

type Data = Item[];

const Checkboxes = ({
  data,
  name,
  customCheckboxContainerStyle,
  onChange,
}: {
  data: Data;
  name: string;
  customCheckboxContainerStyle?: SerializedStyles;
  onChange: OnChange;
}) => {
  return (
    <div css={containerStyle}>
      {data.map((item: Item) => {
        return (
          <Checkbox
            name={name}
            key={item.id}
            id={`${name}-${item.id}`}
            value={item.value}
            customContainerStyle={customCheckboxContainerStyle}
            onChange={onChange}
          >
            <Text>{item.label}</Text>
          </Checkbox>
        );
      })}
    </div>
  );
};

export default Checkboxes;
