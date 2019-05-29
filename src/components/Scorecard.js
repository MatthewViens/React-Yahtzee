import React from 'react';
import ScoreItem from './ScoreItem';

class Scorecard extends React.Component {
  render() {
    return (
      <div>
        <h2>Upper</h2>
        <ScoreItem />
        <ScoreItem />
        <ScoreItem />
        <ScoreItem />
        <ScoreItem />
        <ScoreItem />
        <h2>Lower</h2>
        <ScoreItem />
        <ScoreItem />
        <ScoreItem />
        <ScoreItem />
        <ScoreItem />
        <ScoreItem />
        <ScoreItem />
      </div>
    )
  }
}

export default Scorecard;