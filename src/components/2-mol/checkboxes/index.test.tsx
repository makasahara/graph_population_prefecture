import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Checkboxes from './index';


describe('Checkboxes', () => {

  const user = userEvent.setup();
  const mockCheckboxData = [
    { id: 1, value: '1', label: '北海道' },
    { id: 2, value: '2', label: '青森県' },
  ];
  const mockFn = jest.fn();

  beforeEach(() => {
    mockFn.mockClear();
  });

  it('すべてのチェックボックスが正しく表示されること', () => {
    render(
      <Checkboxes
        data={mockCheckboxData}
        name="test-checkbox"
        onChange={mockFn}
      />
    );

    mockCheckboxData.forEach(item => {
      expect(screen.getByLabelText(item.label)).toBeInTheDocument();
      const checkbox = screen.getByRole('checkbox', { name: item.label });
      expect(checkbox).not.toBeChecked();
    });
  });

  it('チェックボックスをクリックするとチェックがされ、関数が呼ばれること', async () => {
    render(
      <Checkboxes
        data={mockCheckboxData}
        name="test-checkbox"
        onChange={mockFn}
      />
    );

    const checkbox = screen.getByRole('checkbox', { name: mockCheckboxData[0].label });
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('チェックボックスを2回クリックするとチェックが外れ、関数が2回呼ばれること', async () => {
    render(
      <Checkboxes
        data={mockCheckboxData}
        name="test-checkbox"
        onChange={mockFn}
      />
    );

    const checkbox = screen.getByRole('checkbox', { name: mockCheckboxData[0].label });
    await user.click(checkbox);
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

});