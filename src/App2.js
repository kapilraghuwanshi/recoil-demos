import "./App.css";
import {
  RecoilRoot,
  atom,
  useRecoilState,
  useRecoilValue,
  selector,
} from "recoil";

function App2() {
  return (
    <div className="App">
      <RecoilRoot>
        <TempCelsius/>
      </RecoilRoot>
    </div>
  );
}

const tempFahrenheit = atom({
  key: 'tempFahrenheit',
  default: 32,
});

const tempCelsius = selector({
  key: 'tempCelsius',
  get: ({get}) => ((get(tempFahrenheit) - 32) * 5) / 9,
  set: ({set}, newValue) => set(tempFahrenheit, (newValue * 9) / 5 + 32),
});

function TempCelsius() {
  // This hook will subscribe the component to re-render for any changes in the requested state(atom or selector)
  // Returns a tuple where the first element is the value of the recoil state and the second is a setter to update that state.
  const [tempC, setTempC] = useRecoilState(tempCelsius); // selector
  const [tempF, setTempF] = useRecoilState(tempFahrenheit); // atom 

  const addTenCelsius = () => setTempC(tempC + 10);
  const addTenFahrenheit = () => setTempF(tempF + 10);

  return (
    <div>
      Temp (Celsius): {tempC}
      <br />
      Temp (Fahrenheit): {tempF}
      <br />
      <button onClick={addTenCelsius}>Add 10 Celsius</button>
      <br />
      <button onClick={addTenFahrenheit}>Add 10 Fahrenheit</button>
    </div>
  );
}
export default App2;
