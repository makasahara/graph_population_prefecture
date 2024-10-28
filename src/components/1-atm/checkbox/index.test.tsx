import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Checkbox from "./index";
import Text from "../text";

describe("Checkbox", () => {
  const user = userEvent.setup();

  const labelText = "北海道";
  const mockFn = jest.fn();
  const mockCheckboxItem = {
    id: "prefecture-1",
    name: "prefecture",
    value: "1",
    onChange: mockFn,
  };

  const renderCheckbox = () => {
    return render(
      <Checkbox {...mockCheckboxItem}>
        <Text>{labelText}</Text>
      </Checkbox>,
    );
  };

  beforeEach(() => {
    mockFn.mockClear();
  });

  it("チェックボックスが正しく表示されること", () => {
    renderCheckbox();
    expect(screen.getByText(labelText)).toBeInTheDocument();
    const checkbox = screen.getByRole("checkbox", { name: labelText });
    expect(checkbox).not.toBeChecked();
  });

  it("チェックボックスをクリックするとチェックがされ、関数が呼ばれること", async () => {
    renderCheckbox();
    const checkbox = screen.getByRole("checkbox", { name: labelText });
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("チェックボックスを2回クリックするとチェックがされ、関数が2回呼ばれること", async () => {
    renderCheckbox();
    const checkbox = screen.getByRole("checkbox", { name: labelText });
    await user.click(checkbox);
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});
