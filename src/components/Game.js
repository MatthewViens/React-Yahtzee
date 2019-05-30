import React from 'react';
import Dice from './Dice';
import Scorecard from './Scorecard';
import { rolld6, scoringFunctions } from '../helpers.js';
import '../styles/Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rollsLeft: 2,
      dice: Array.from(Array(5)).map(i => ({value: rolld6(), locked: false})),
      score: 0,
      scoreItems: [
        {name: 'Aces', score: null, description: 'Sum of all Aces'},
        {name: 'Twos', score: null, description: 'Sum of all Twos'},
        {name: 'Threes', score: null, description: 'Sum of all Threes'},
        {name: 'Fours', score: null, description: 'Sum of all Fours'},
        {name: 'Fives', score: null, description: 'Sum of all Fives'},
        {name: 'Sixes', score: null, description: 'Sum of all Sixes'},
        {name: '3 of a kind', score: null, description: 'Sum of all dice if 3 are the same'},
        {name: '4 of a kind', score: null, description: 'Sum of all dice if 4 are the same'},
        {name: 'Small Straight', score: null, description: '25 points for a full house'},
        {name: 'Large Straight', score: null, description: '30 points for a small straight'},
        {name: 'Full House', score: null, description: '40 points for a large straight'},
        {name: 'YAHTZEE', score: null, description: '50 points for yahtzee'}
      ]
    }
    
    this.rollDice = this.rollDice.bind(this);
    this.resetRoll = this.resetRoll.bind(this);
    this.toggleDieLock = this.toggleDieLock.bind(this);
    this.handleScore = this.handleScore.bind(this);
  }
  
  rollDice() {
    const newDice = this.state.dice.map((die) => {
      return die.locked ? die : {...die, value: rolld6()};
    })
    this.setState(prev => (
      {
        rollsLeft: prev.rollsLeft - 1,
        dice: newDice
      }));
  }
  
  resetRoll() {
    this.setState(
      {
        dice: Array.from(Array(5)).map(i => ({value: rolld6(), locked: false})),
        rollsLeft: 2
      }
    )
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
  
  handleScore(name) {
    const scoreValue = scoringFunctions[name](this.state.dice);
    let index;
    for(let i = 0; i < this.state.scoreItems.length; i++) {
      if(this.state.scoreItems[i].name === name) {
        index = i;
        console.log(i);
      }
    }
    let updatedScoreItems = [...this.state.scoreItems];
    updatedScoreItems[index].score = scoreValue;
    this.setState((prev) => (
      {
        score: prev.score + scoreValue,
        scoreItems: updatedScoreItems
      }
    ))
    this.resetRoll();
  }
  
  render() {
    return (
      <div className="game">
        <h1 className="game__h1">Yahtzee!</h1>
        <Dice 
          dice={this.state.dice}
          rollsLeft={this.state.rollsLeft}
          rollDice={this.rollDice}
          toggleDieLock={this.toggleDieLock}
        />
        <Scorecard 
          dice={this.state.dice} 
          resetRoll={this.resetRoll} 
          handleScore={this.handleScore}
          scoreItems={this.state.scoreItems}
        />
        <h2>{`Score: ${this.state.score}`}</h2>
      </div>
    )
  }
}

export default Game;