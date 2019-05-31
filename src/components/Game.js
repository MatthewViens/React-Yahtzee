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
      upperBonus: false,
      yahtzeeBonus: 0,
      yahtzeeMode: false,
      scoreItems: [
        {name: 'Aces', score: null, description: 'Sum of all Aces'},
        {name: 'Twos', score: null, description: 'Sum of all Twos'},
        {name: 'Threes', score: null, description: 'Sum of all Threes'},
        {name: 'Fours', score: null, description: 'Sum of all Fours'},
        {name: 'Fives', score: null, description: 'Sum of all Fives'},
        {name: 'Sixes', score: null, description: 'Sum of all Sixes'},
        {name: '3 of a kind', score: null, description: 'Sum of all dice if 3 are the same'},
        {name: '4 of a kind', score: null, description: 'Sum of all dice if 4 are the same'},
        {name: 'Small Straight', score: null, description: '30 points for a small straight'},
        {name: 'Large Straight', score: null, description: '40 points for a large straight'},
        {name: 'Full House', score: null, description: '25 points for a full house'},
        {name: 'YAHTZEE', score: null, description: '50 points for yahtzee'},
        {name: 'Chance', score: null, description: 'Sum all dice'}
      ]
    }
    
    this.rollDice = this.rollDice.bind(this);
    this.resetRoll = this.resetRoll.bind(this);
    this.toggleDieLock = this.toggleDieLock.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.updateBonus = this.updateBonus.bind(this);
    this.checkUpperBonus = this.checkUpperBonus.bind(this);
    this.updateYahtzeeState = this.updateYahtzeeState.bind(this);
    this.isYahtzee = this.isYahtzee.bind(this);
  }
  
  rollDice() {
    const newDice = this.state.dice.map((die) => {
      return die.locked ? die : {...die, value: rolld6()};
    })
    this.setState(prev => (
      {
        rollsLeft: prev.rollsLeft - 1,
        dice: newDice
      }), () => this.isYahtzee());
  }
  
  resetRoll() {
    this.setState(
      {
        dice: Array.from(Array(5)).map(i => ({value: rolld6(), locked: false})),
        rollsLeft: 2
      }, () => this.isYahtzee()
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
  
  isYahtzee() {
    let yahtzeeDice;
    for(let i = 0; i < this.state.dice.length - 1; i++) {
      if (this.state.dice[i].value !== this.state.dice[i + 1].value) {
        return this.setState({yahtzeeMode: false})
      }
    }
    if(this.state.yahtzeeBonus) this.setState({yahtzeeMode: true})
  }
  
  handleScore(name) {
    let scoreValue = scoringFunctions[name](this.state.dice, this.state.yahtzeeMode);
    let index;
    let yahtzeeIndex;
    for(let i = 0; i < this.state.scoreItems.length; i++) {
      if(this.state.scoreItems[i].name === name) {
        index = i;
      }
      if(this.state.scoreItems[i].name === 'YAHTZEE') {
        yahtzeeIndex = i;
      }
    }
    let updatedScoreItems = [...this.state.scoreItems];
    updatedScoreItems[index].score = scoreValue;
    this.setState((prev) => (
      {
        score: prev.score + scoreValue,
        scoreItems: updatedScoreItems
      }
    ), () => {this.updateBonus(yahtzeeIndex)})
    this.resetRoll();
  }
  
  updateBonus(yahtzeeIndex) {
    if(!this.state.upperBonus) this.checkUpperBonus();
    if(!this.state.yahtzeeBonus) {
      this.updateYahtzeeState(yahtzeeIndex);
    } else if(this.state.yahtzeeMode) {
      this.setState((prev) => (
        {
          score: prev.score + 100,
          yahtzeeBonus: prev.yahtzeeBonus + 1 
      }))
    }
  }
  
  checkUpperBonus() {
    const totalUpper = this.state.scoreItems.slice(0, 6).reduce((total, item) => {
      return item.score ? item.score + total : 0 + total;
    }, 0);
    if(totalUpper >= 63) {
      this.setState((prev) => (
        {
          upperBonus: true,
          score: prev.score + 35
        }
      ))
    }
  }
  
  updateYahtzeeState(yahtzeeIndex) {
    if(this.state.scoreItems[yahtzeeIndex].score) {
      this.setState((prev) => ({yahtzeeBonus: prev.yahtzeeBonus + 1}))
    }
  }
  
  render() {
    return (
      <div className="game">
        <div className="game__header">
          <div className="game__title">
            <a href="https://github.com/MatthewViens/React-Yahtzee" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github" title="GitHub"></i>
            </a>
            <h1 className="game__h1">Yahtzee!</h1>
            <a href="http://www.yahtzee.org.uk/rules.html" target="_blank" rel="noopener noreferrer">
              <i className="far fa-question-circle" title="help"></i>
            </a>
          </div>
          <Dice 
            dice={this.state.dice}
            rollsLeft={this.state.rollsLeft}
            rollDice={this.rollDice}
            toggleDieLock={this.toggleDieLock}
            yahtzeeMode={this.state.yahtzeeMode}
          />
        </div>
        <Scorecard 
          dice={this.state.dice} 
          upperBonus={this.state.upperBonus}
          yahtzeeBonus={this.state.yahtzeeBonus}
          resetRoll={this.resetRoll} 
          handleScore={this.handleScore}
          scoreItems={this.state.scoreItems}
        />
        <div className="game__score-header">
          <h2 className="game__score">{`Total Score: ${this.state.score}`}</h2>
        </div>
      </div>
    )
  }
}

export default Game;