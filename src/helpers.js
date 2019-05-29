const rolld6 = () => Math.floor(Math.random() * 6 + 1);

const upperScore = (dice, value) => (
  dice.reduce((total, die) => die.value === value ? total + die.value : total, 0)
)

export { rolld6, upperScore };