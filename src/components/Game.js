import React from 'react';
import Dice from './Dice';
import Scorecard from './Scorecard';
import '../styles/Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rollsLeft: 2,
      dice: Array.from(Array(5)).map(i => ({value: Math.floor(Math.random() * 6 + 1), locked: false}))
    }
    
    this.rollDice = this.rollDice.bind(this);
    this.toggleDieLock = this.toggleDieLock.bind(this);
  }
  
  rollDice() {
    const newDice = this.state.dice.map((die) => {
      return die.locked ? die : {locked: false, value: Math.floor(Math.random() * 6 + 1)};
    })
    console.log(newDice)
    this.setState(prev => (
      {
        rollsLeft: prev.rollsLeft - 1,
        dice: newDice
      }));
  }
  
  toggleDieLock(index) {
    this.setState((prev) => {
      return({
        dice: prev.dice.map((die, i) => {
          if(i === index) {
            return {...die, locked: !die.locked};
          } else {
            return die
          }
        })
      })
    })
  }
  
  render() {
    return (
      <div className="game">
        <h1>Yahtzee!</h1>
        <Dice 
          dice={this.state.dice}
          rollsLeft={this.state.rollsLeft}
          rollDice={this.rollDice}
          toggleDieLock={this.toggleDieLock}
        />
        <Scorecard />
      </div>
    )
  }
}

export default Game;