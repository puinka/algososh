import renderer from "react-test-renderer";
import { ElementStates } from "../../../types/element-states";
import { Circle } from "./circle";

describe("should render Circle component", () => {
  it("without letters", () => {
    const circle = renderer.create(<Circle />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("with a letter", () => {
    const circle = renderer.create(<Circle letter={"a"} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("with head", () => {
    const circle = renderer.create(<Circle head={"head"} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("with an element in head", () => {
    const circle = renderer
      .create(<Circle head={<Circle isSmall />} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("with tail", () => {
    const circle = renderer.create(<Circle tail={"tail"} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("with an element in tail", () => {
    const circle = renderer
      .create(<Circle tail={<Circle isSmall />} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("with an index", () => {
    const circle = renderer.create(<Circle index={0} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("as small", () => {
    const circle = renderer.create(<Circle isSmall />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("as default state", () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("as changing state", () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("as modified state", () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });
});
