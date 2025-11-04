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
  { name: 'New Game', path: '/game' },
  { name: 'Difficulty', path: '/difficulty' },
  { name: 'Mode', path: '/mode' },
  { name: 'Settings', path: '/settings' }
]
export const states_mode=[
  { name: 'PvP Local', path: '#' },
  { name: 'PvBot', path: '#' },
  { name: 'PvP Online', path: '#' },
  
  ]
export const states_diff=[
  { name: 'Easy', path: '#' },
  { name: 'Medium', path: '#' },
  { name: 'Hard', path: '#' },
  ]

export const states_settings=[
  { name: 'Volume', path: '#' },
  { name: 'Symbol', path: '#' },
  { name: 'UI style', path: '#' },
  
  ]
