import { Button } from "./button";
import renderer from 'react-test-renderer';
import { fireEvent, render, screen } from "@testing-library/react";
const buttonText = 'test';
const clickFn = () => {
  alert(buttonText);
}

describe('Button component renders correctly', () => {
  it('with text', () => {
    const button = renderer.create(<Button text={buttonText} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it('without text', () => {
    const button = renderer.create(<Button />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it('with disabled attribute', () => {
    const button = renderer.create(<Button disabled={true} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it('with loaded state', () => {
    const button = renderer.create(<Button isLoader={true} />).toJSON();
    expect(button).toMatchSnapshot();
  });
  
  it('with onClick action', () => {
    window.alert = jest.fn();
    render(<Button onClick={clickFn} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalledWith(buttonText);
  });
})