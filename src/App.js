import "./App.css";
import {
  RecoilRoot,
  atom,
  useRecoilState,
  useRecoilValue,
  selector,
} from "recoil";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <TextInput />
        <CharacterCount />
        <br/>
        <CharacterCountEvenOdd/>
      </RecoilRoot>
    </div>
  );
}

// atom - state
const textStateAtom = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "kapil", // default value 
});

function TextInput() {
  const [text, setText] = useRecoilState(textStateAtom); // a tuple of the current value of the state and a setter function
  const onChange = (event) => {
    setText(event.target.value);
  };
  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}
// read only selector
const charCountStateSelector = selector({
  key: "charCountState",
  get: ({ get }) => {
    const text = get(textStateAtom);
    return text.length;
  },
});

function CharacterCount() {
  const count = useRecoilValue(charCountStateSelector); // Returns the value of an atom or selector
  return <>Character Count: {count}</>;
}

// read only selector
const charCountEvenStateSelector = selector({
  key: "charCountStateEven",
  get: ({ get }) => {
    const text = get(textStateAtom);
    return text.length%2===0? "Yes" : "No";
  },
});

function CharacterCountEvenOdd() {
  const isEven = useRecoilValue(charCountEvenStateSelector);  // Returns the value of an atom or selector
  return <>Character is Even: {isEven}</>;
}

export default App;
