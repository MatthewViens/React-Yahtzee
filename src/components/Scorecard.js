import React from 'react';
import ScoreItem from './ScoreItem';
import { upperScore } from '../helpers.js';

class Scorecard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0
    }
    
    this.handleUpperScore = this.handleUpperScore.bind(this)
  }
    
  handleUpperScore(value) {
    const score = upperScore(this.props.dice, value);
    this.setState(prev => ({score: prev.score + score}))
    this.props.resetRoll();
  }
  
  render() {
    const upperNames = ['Aces', 'Twos', 'Threes', 'Fours', 'Fives', 'Sixes'];
    const upperItems = upperNames.map((name, index) => {
      return <ScoreItem name={name} value={index + 1} handleUpperScore={this.handleUpperScore} />
    })
    return (
      <div>
        <h2>Upper</h2>
          {upperItems}
        <h2>Lower</h2>
        <h1>Score: {this.state.score}</h1>
      </div>
    )
  }
}

export default Scorecard;