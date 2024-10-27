import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Text from './index';

const text = "テキストメッセージ";

describe('Text', () => {
  it("テキストが表示される", async () => {
    render(<Text>{text}</Text>);
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});