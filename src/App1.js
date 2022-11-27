import "./App.css";
import {
  RecoilRoot,
  atom,
  useRecoilState,
  useRecoilValue,
  selector,
} from "recoil";

function App1() {
  return (
    <div className="App">
      <RecoilRoot>
        <TextComponent/>
        <FontButton/>
        <br />
        <NameDisplay/>
      </RecoilRoot>
    </div>
  );
}

const fontSizeState = atom({
  key: 'fontSizeState',
  default: 14,
});

// read only selector
const fontSizeLabelState = selector({
  key: 'fontSizeLabelState',
  get: ({get}) => {
    const fontSize = get(fontSizeState);
    const unit = 'px';

    return `${fontSize}${unit}`;
  },
});

function TextComponent() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  return <p style={{fontSize}}>This text will increase in size too.</p>;
}

function FontButton() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState); // Returns a tuple where the first element is the value of the recoil state and the second is a setter to update that state.
  const fontSizeLabel = useRecoilValue(fontSizeLabelState); // Returns the value of an atom or selector

  return (
    <>
      <div>Current font size: {fontSizeLabel}</div>
      <button onClick={() => setFontSize(fontSize + 1)} style={{fontSize}}>
        Click to Enlarge
      </button>
    </>
  );
}


const namesState = atom({
  key: 'namesState',
  default: ['', 'Ella', 'Chris', '', 'Paul'],
});

const filteredNamesState = selector({
  key: 'filteredNamesState',
  get: ({get}) => get(namesState).filter((str) => str !== ''),
});

function NameDisplay() {
  const names = useRecoilValue(namesState); // read atom
  const filteredNames = useRecoilValue(filteredNamesState); // read selector

  return (
    <>
    <br />
      Original names: {names.join(',')}
      <br />
      Filtered names: {filteredNames.join(',')}
    </>
  );
}

export default App1;
