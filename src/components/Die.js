import React from 'react';
import '../styles/Die.css';

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
      <div className={
        this.props.locked
          ? "die locked"
          : "die"
        }>
        <i className={
          this.props.value
            ? icons[this.props.value]
            : icons[Math.floor(Math.random() * 6 + 1)]
          }
          onClick={this.handleClick}></i>
      </div>
    )
  }
}

export default Die;