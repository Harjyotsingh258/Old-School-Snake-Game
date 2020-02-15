import React from "react";
import Snake from "./components/Snake.js";
import Food from "./components/Food";

const getRandomCoordinates = () => {
  let min = 0;
  let max = 98;
  let x = [Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2];
  let y = [Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2];
  return [x, y];
};

const initialState = {
  snakePos: [
    [0, 0],
    [2, 0],
    [4, 0]
  ],
  direction: "RIGHT",
  snakeSpeed: 200,
  foodPos: getRandomCoordinates()
};

class App extends React.Component {
  state = initialState;

  componentDidMount() {
    setInterval(this.moveSnake, this.state.snakeSpeed);
    document.onkeydown = e => {
      e = e || window.event;
      // Left: 37
      // Top: 38
      // Right: 39
      // Down: 40
      switch (e.keyCode) {
        case 37:
          this.setState({ direction: "LEFT" });
          this.moveSnake();
          break;
        case 38:
          this.setState({ direction: "TOP" });
          this.moveSnake();
          break;
        case 39:
          this.setState({ direction: "RIGHT" });
          this.moveSnake();
          break;
        case 40:
          this.setState({ direction: "DOWN" });
          this.moveSnake();
          break;
      }
    };
  }

  componentDidUpdate() {
    this.checkIfEat();
    this.checkWithinBorder();
    this.checkIfCollapsed();
  }

  moveSnake = () => {
    let snakeBody = [...this.state.snakePos];
    let head = snakeBody[snakeBody.length - 1];

    switch (this.state.direction) {
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "TOP":
        head = [head[0], head[1] - 2];
        break;
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
    }
    snakeBody.push(head); //here we are adding the head in the original array
    //shifting the array by one index!
    //eg. exampleArray = [2,3,4,5,6,7] ==> exampleArray.shift() ==> [3,4,5,6,7]
    snakeBody.shift();
    // console.log(snakeBody);

    this.setState({ snakePos: snakeBody });
  };

  checkIfEat() {
    let head = this.state.snakePos[this.state.snakePos.length - 1];
    let food = this.state.foodPos;
    if (head[0] == food[0] && head[1] == food[1]) {
      this.setState({ foodPos: getRandomCoordinates() });
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }

  enlargeSnake() {
    let snakeBody = [...this.state.snakePos];
    snakeBody.unshift([]);
    this.setState({
      snakePos: snakeBody
    });
  }

  increaseSpeed() {
    if (this.state.snakeSpeed > 10) {
      this.setState({
        snakeSpeed: this.state.snakeSpeed - 10
      });
    }
  }

  checkIfCollapsed() {
    const snakeBody = [...this.state.snakePos];
    const head = this.state.snakePos[this.state.snakePos.length - 1];
    snakeBody.pop();
    snakeBody.forEach(element => {
      if (head[0] === element[0] && head[1] === element[1]) {
        this.gameOver();
      }
    });
  }

  checkWithinBorder = () => {
    const head = this.state.snakePos[this.state.snakePos.length - 1];

    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.gameOver();
    }
  };

  gameOver() {
    alert(`Gaame Over | Snake Length : ${this.state.snakePos.length}`);
    this.setState(initialState);
  }

  render() {
    return (
      <div className="container">
        {/* Game Area */}
        <div>
          X :{this.state.snakePos[this.state.snakePos.length - 1][0]}Y :
          {this.state.snakePos[this.state.snakePos.length - 1][1]}
        </div>
        <div className="gameArea">
          <Snake snakePos={this.state.snakePos} />
          <Food dot={this.state.foodPos}></Food>
        </div>
      </div>
    );
  }
}

export default App;
