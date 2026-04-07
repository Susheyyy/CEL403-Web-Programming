import logo from './logo.svg';
import './App.css';
import Button from './components/Button/Button';
import CounterComponent from './components/CouterComponent/CounterComponent';
import Todoitem from './components/Todoitem/Todoitem';

function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
      <CounterComponent/>
      <Todoitem text="Eat"/>
      <Todoitem completed={true} text="Code"/>
      <Todoitem text="watch"/>
    </div>
  );
}

export default App;
