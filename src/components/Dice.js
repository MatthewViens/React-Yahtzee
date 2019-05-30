import React from 'react';
import Die from './Die';
import '../styles/Dice.css';

class Dice extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    if(this.props.rollsLeft > 0) {
      this.props.rollDice();
    }
  }
  
  render() {
    return (
      <div className="dice">
        <div className="dice__container">
          {this.props.dice.map((die, i) => (
            <Die 
              value={die.value} 
              locked={die.locked}
              rollsLeft={this.props.rollsLeft}
              toggleDieLock={this.props.toggleDieLock}
              index={i}
              key={i}
          />))}
        </div>
        <button 
          className="dice__roll-button"
          disabled={!this.props.rollsLeft > 0}
          onClick={this.handleClick}
        > {this.props.rollsLeft} Rolls Left
        </button>
      </div>
    )
  }
}

export default Dice;