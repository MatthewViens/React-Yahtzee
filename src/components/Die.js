import React from 'react';
import '../styles/Die.css';
import { rolld6 } from '../helpers';

class Die extends React.Component {j
  constructor(props) {
    super(props);
    
    this.handleClick = this.handleClick.bind(this)
  }
  
  handleClick() {
    this.props.toggleDieLock(this.props.index);
  }
  
  render() {
    const icons = [
      null,
      'fas fa-dice-one',
      'fas fa-dice-two',
      'fas fa-dice-three',
      'fas fa-dice-four',
      'fas fa-dice-five',
      'fas fa-dice-six'
    ];
    return (
      <button className={
        this.props.locked
          ? "die locked"
          : "die"
        }
        disabled={
          !this.props.rollsLeft > 0
        }>
        <i className={
          this.props.value
            ? icons[this.props.value]
            : icons[rolld6()]
          }
          onClick={this.handleClick}></i>
      </button>
    )
  }
}

export default Die;