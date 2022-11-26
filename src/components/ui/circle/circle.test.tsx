import { Circle } from "./circle";
import renderer from 'react-test-renderer';
import { ElementStates } from "../../../types/element-states";

const letter = "A";

describe('Circle component renders correctly', () => {
  it('without a character', () => {
    const circle = renderer.create(<Circle />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('with a character', () => {
    const circle = renderer.create(<Circle letter={letter}/>).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('wit a head pointer', () => {
    const circle = renderer.create(<Circle head={letter}/>).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('with a react element as a head pointer', () => {
    const head = <Circle isSmall={true} letter={letter} />;
    const circle = renderer.create(<Circle head={head}/>).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('with a tail pointer', () => {
    const circle = renderer.create(<Circle tail={letter}/>).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('with a react element as a tail pointer', () => {
    const tail = <Circle isSmall={true} letter={letter} />;
    const circle = renderer.create(<Circle tail={tail}/>).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('with an index', () => {
    const circle = renderer.create(<Circle index={0}/>).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('with a prop isSmall', () => {
    const circle = renderer.create(<Circle isSmall={true}/>).toJSON();
    expect(circle).toMatchSnapshot();
  });
  
  it('with a default state', () => {
    const circle = renderer.create(<Circle state={ElementStates.Default}/>).toJSON();
    expect(circle).toMatchSnapshot();
  });
  
  it('with a changing state', () => {
    const circle = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  
  it('with a modified state', () => {
    const circle = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
})