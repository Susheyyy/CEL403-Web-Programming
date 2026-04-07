import React from "react";
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Button from './components/Button';
import Todoitem from "./components/Todoitem";
import CounterComponent from "./components/CounterComponent";

const App = () => {
  return (
    <div className="todo-container">
      <CounterComponent/>
      <Header/>

      <Todoitem text="Eat"/>
      <Todoitem text="Watch"/>
      <Todoitem text="Study again"/>
      <Todoitem text="Play"/>
      <Todoitem text="Eat"/>
      <Todoitem completed={true} text="Code"/>
      <Button/>
    </div>
  );
}

export default App;
