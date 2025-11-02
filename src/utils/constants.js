 export const winlist = [
  ["11", "12", "13"],
  ["21", "22", "23"],
  ["31", "32", "33"],
  ["11", "21", "31"],
  ["12", "22", "32"],
  ["13", "23", "33"],
  ["11", "22", "33"],
  ["13", "22", "31"]];
 export const cells = ["11", "12", "13", "21", "22", "23", "31", "32", "33"];
 export const states_start=[
  { name: 'Start A New Game', path: '/game' },
  { name: 'Difficulty', path: '/difficulty' },
  { name: 'Mode', path: '/mode' },
  { name: 'Exit', path: '/' }
]
export const states_mode=[
  { name: 'Player Vs Player', path: '#' },
  { name: 'Player Vs Bot', path: '#' },
  { name: 'Bot vs Bot', path: '#' },
  
  ]
export const states_diff=[
  { name: 'Easy', path: '#' },
  { name: 'Medium', path: '#' },
  { name: 'Hard', path: '#' },
  ]
