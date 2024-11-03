import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";
import SelectBox from "./index";

describe("SelectBox", () => {
  const user = userEvent.setup();

  const values = [
    {
      value: "総人口",
      label: "総人口",
    },
    {
      value: "年少人口",
      label: "年少人口",
    },
  ];

  const mockFn = jest.fn();
  const mockSelectBoxItem = {
    id: "selectBox-1",
    name: "selectBox",
    values,
    selectedValue: "総人口",
    onChange: mockFn,
  };

  const renderSelectBox = () => {
    return render(<SelectBox {...mockSelectBoxItem} />);
  };

  beforeEach(() => {
    mockFn.mockClear();
  });

  it("セレクトボックスが正しく表示されること", () => {
    renderSelectBox();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getAllByRole("option").length).toBe(values.length);
    expect(screen.getByRole("option", { name: "総人口" })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "年少人口" }),
    ).toBeInTheDocument();
    expect(
      (screen.getByRole("option", { name: "総人口" }) as HTMLOptionElement)
        .selected,
    ).toBe(true);
  });

  it("他の値を選択したときに、関数が呼ばれること", async () => {
    renderSelectBox();
    await user.selectOptions(screen.getByRole("combobox"), "年少人口");
    expect(mockFn).toHaveBeenCalled();
  });
});
