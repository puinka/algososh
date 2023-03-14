import renderer from "react-test-renderer";
import { ElementStates } from "../../../types/element-states";
import { Column } from "./column";

describe("should render Column component", () => {
  it("without props", () => {
    const column = renderer.create(<Column />).toJSON();
    expect(column).toMatchSnapshot();
  });

  it("as default state", () => {
    const column = renderer
      .create(<Column state={ElementStates.Default} />)
      .toJSON();
    expect(column).toMatchSnapshot();
  });

  it("as changing state", () => {
    const column = renderer
      .create(<Column state={ElementStates.Changing} />)
      .toJSON();
    expect(column).toMatchSnapshot();
  });

  it("as modified state", () => {
    const column = renderer
      .create(<Column state={ElementStates.Modified} />)
      .toJSON();
    expect(column).toMatchSnapshot();
  });
});
