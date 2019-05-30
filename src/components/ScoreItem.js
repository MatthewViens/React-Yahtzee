import React from 'react';
import '../styles/ScoreItem.css'

class ScoreItem extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.props.handleScore(this.props.name);
  }
  
  render() {
    return (
      <button 
      onClick={this.handleClick} 
      className="score-item"
      disabled={this.props.score !== null}
      >
        <p className="score-item--name">{this.props.name}</p>
        <p>{this.props.score !== null ? this.props.score : this.props.description}</p>
      </button>
    )
  }
}

export default ScoreItem;