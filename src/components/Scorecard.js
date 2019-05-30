import React from 'react';
import ScoreItem from './ScoreItem';
import '../styles/Scorecard.css';

class Scorecard extends React.Component {
    
  render() {
    return (
      <div className="scorecard">
        <div className="scorecard__header">
          <h2>Upper Section</h2>
        </div>
        {this.props.scoreItems.slice(0, 6).map((item) => {
          return <ScoreItem 
            key={item.name}
            name={item.name}
            score={item.score}
            description={item.description}
            handleScore={this.props.handleScore} />
        })}
        <div className="scorecard__bonus-score">
          <p>{this.props.upperBonus
              ? <span>Upper Bonus <i class="fas fa-check"></i></span>
              : 'Upper Bonus'
          }</p>
          <p>{this.props.upperBonus
            ? 35
            : "Score at least 63 in upper section"
          }</p>
        </div>
        <div className="scorecard__header">
          <h2>Lower Section</h2>
        </div>
        {this.props.scoreItems.slice(6, 12).map((item) => {
          return <ScoreItem 
            key={item.name}
            name={item.name}
            score={item.score}
            description={item.description}
            handleScore={this.props.handleScore} />
        })}
      </div>
    )
  }
}

export default Scorecard;