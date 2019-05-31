const rolld6 = () => Math.floor(Math.random() * 6 + 1);

const scoringFunctions = {};

scoringFunctions['Ones'] = (dice) => (
  dice.reduce((total, die) => die.value === 1 ? total + die.value : total, 0)
)

scoringFunctions['Twos'] = (dice) => (
  dice.reduce((total, die) => die.value === 2 ? total + die.value : total, 0)
)

scoringFunctions['Threes'] = (dice) => (
  dice.reduce((total, die) => die.value === 3 ? total + die.value : total, 0)
)

scoringFunctions['Fours'] = (dice) => (
  dice.reduce((total, die) => die.value === 4 ? total + die.value : total, 0)
)

scoringFunctions['Fives'] = (dice) => (
  dice.reduce((total, die) => die.value === 5 ? total + die.value : total, 0)
)

scoringFunctions['Sixes'] = (dice) => (
  dice.reduce((total, die) => die.value === 6 ? total + die.value : total, 0)
)

scoringFunctions['3 of a kind'] = (dice, yahtzeeMode) => {
  for(let i = 0; i < dice.length; i++) {
    let occurances = dice.reduce((occurances, die) => die.value === dice[i].value ? occurances + 1 : occurances, 0)
    if (occurances >= 3 || yahtzeeMode) {
      return dice.reduce((total, die) => total + die.value, 0);
    }
  }
  return 0;
}

scoringFunctions['4 of a kind'] = (dice, yahtzeeMode) => {
  for(let i = 0; i < dice.length; i++) {
    let occurances = dice.reduce((occurances, die) => die.value === dice[i].value ? occurances + 1 : occurances, 0)
    if (occurances >= 4 || yahtzeeMode) {
      return dice.reduce((total, die) => total + die.value, 0);
    }
  }
  return 0;
}

scoringFunctions['Full House'] = (dice, yahtzeeMode) => {
  for(let i = 0; i < dice.length; i++) {
    let diceCopy = dice.map(die => ({...die}))
    let occurances = 0;
    for(let j = 0; j < diceCopy.length; j++) {
      if(dice[i].value === diceCopy[j].value) {
        diceCopy.splice(j, 1);
        occurances += 1;
        j -= 1;
        if ((occurances === 3 && diceCopy[0].value === diceCopy[1].value) || yahtzeeMode) return 25
      }
    }
  }
  return 0
}

scoringFunctions['Small Straight'] = (dice, yahtzeeMode) => {
  let occurances = 1;
  let sortedDice = [...dice].sort((a, b) => a.value - b.value);
  for(let i = 0; i < dice.length - 1; i++) {
    if(sortedDice[i + 1].value === sortedDice[i].value + 1) {
      occurances += 1;
    }
  }
  return occurances >= 4 || yahtzeeMode ? 30 : 0;
}

scoringFunctions['Large Straight'] = (dice, yahtzeeMode) => {
  let occurances = 1;
  let sortedDice = [...dice].sort((a, b) => a.value - b.value);
  for(let i = 0; i < dice.length - 1; i++) {
    if(sortedDice[i + 1].value === sortedDice[i].value + 1) {
      occurances += 1;
    }
  }
  return occurances >= 5 || yahtzeeMode ? 40 : 0;
}

scoringFunctions['YAHTZEE'] = (dice) => {
  for(let i = 0; i < dice.length - 1; i++) {
    if (dice[i].value !== dice[i + 1].value) return 0;
  }
  return 50;
}

scoringFunctions['Chance'] = (dice) => {
  return dice.reduce((total, die) => (total + die.value), 0)
}

export { rolld6, scoringFunctions }