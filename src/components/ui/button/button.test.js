import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("should render Button component", () => {
  it("with text", () => {
    const button = renderer.create(<Button text={"text"} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("with no text", () => {
    const button = renderer.create(<Button />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("as disabled", () => {
    const button = renderer.create(<Button disabled />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("as loading", () => {
    const button = renderer.create(<Button isLoader />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("fire a click event", () => {
    const mockCallBack = jest.fn();

    render(<Button text={"buttonText"} onClick={mockCallBack} />);

    const button = screen.getByText("buttonText");

    fireEvent.click(button);

    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
