import React from 'react';
import ScoreItem from './ScoreItem';

class Scorecard extends React.Component {
    
  render() {
    return (
      <div>
        {this.props.scoreItems.map((item) => {
          return <ScoreItem 
            name={item.name}
            score={item.score}
            description={item.description}
            handleScore={this.props.handleScore} />
        })}
        {/*}<h2>Upper Section</h2>
        <ScoreItem handleScore={this.props.handleScore} name={"Aces"} />
        <ScoreItem handleScore={this.props.handleScore} name={"Twos"} />
        <ScoreItem handleScore={this.props.handleScore} name={"Threes"} />
        <ScoreItem handleScore={this.props.handleScore} name={"Fours"} />
        <ScoreItem handleScore={this.props.handleScore} name={"Fives"} />
        <ScoreItem handleScore={this.props.handleScore} name={"Sixes"} />
        <h2>Lower Section</h2>
        <ScoreItem handleScore={this.props.handleScore} name={"3 of a kind"} />
        <ScoreItem handleScore={this.props.handleScore} name={"4 of a kind"} />
        <ScoreItem handleScore={this.props.handleScore} name={"Full House"} />
        <ScoreItem handleScore={this.props.handleScore} name={"Small Straight"} />
        <ScoreItem handleScore={this.props.handleScore} name={"Large Straight"} />
        <ScoreItem handleScore={this.props.handleScore} name={"YAHTZEE"} />
      </div>*/}
      </div>
    )
  }
}

export default Scorecard;