import React from 'react';

class ScoreItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    }
    
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.props.handleUpperScore(this.props.value);
    this.setState({disabled: true})
  }
  
  render() {
    return (
      <button onClick={this.handleClick} disabled={this.state.disabled}>
        <p>{this.props.name}</p>
      </button>
    )
  }
}

export default ScoreItem;