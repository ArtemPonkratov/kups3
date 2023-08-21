import React, { Component } from "react";
import "./App.css";

class App extends Component {
  // Инициализация начального состояния
  state = {
    count: 0,
  };

  // Метод для увеличения счётчика
  handleIncrement = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  // Метод для уменьшения счётчика
  handleDecrement = () => {
    this.setState((prevState) => ({
      count: prevState.count - 1,
    }));
  };

  render() {
    return (
      <div className="App">
        <h1>Счётчик: {this.state.count}</h1>
        <button onClick={this.handleIncrement}>Увеличить</button>
        <button onClick={this.handleDecrement}>Уменьшить</button>
      </div>
    );
  }
}

export default App;
