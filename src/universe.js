const ALIVE = 1;
const DEAD = 0;

function createUniverse(initialState) {
  return initialState;
}

function getNeigthbors(universe, x, y) {
  return [
    x > 0 && y > 0 ? universe[x - 1][y - 1] : null,
    y > 0 ? universe[x][y - 1] : null,
    x < universe.length - 1 && y > 0 ? universe[x + 1][y - 1] : null,
    x > 0 ? universe[x - 1][y] : null,
    x < universe.length - 1 ? universe[x + 1][y] : null,
    x > 0 && y < universe[x].length - 1 ? universe[x - 1][y + 1] : null,
    y < universe[x].length - 1 ? universe[x][y + 1] : null,
    x < universe.length - 1 && y < universe[x].length - 1 ? universe[x + 1][y + 1] : null
  ];
}

function updateStatus(universe) {
  let newStatus = [];

  for (let x = 0; x < universe.length; x++) {
    newStatus.push(new Array(universe[x].length));
    for (let y = 0; y < universe.length; y++) {
      newStatus[x][y] = updateCellStatus(universe, x, y);
    }
  }

  return newStatus;
}

function updateCellStatus(universe, x, y) {
  if (x < 0 || y < 0 || x >= universe.length || y >= universe[0].length) return null;
  const neighbors = getNeigthbors(universe, x, y);
  const aliveNeighbors = neighbors.filter(cell => cell === ALIVE).length;
  return checkAliveNeighbors(universe[x][y], aliveNeighbors);
}

function checkAliveNeighbors(isAlive, aliveNeighbors) {
  if (aliveNeighbors < 2 || aliveNeighbors > 3) return DEAD;
  if (isAlive && (aliveNeighbors === 2 || aliveNeighbors === 3)) return ALIVE;
  if (!isAlive && aliveNeighbors === 3) return ALIVE;
  return DEAD;
}

module.exports = {
  ALIVE,
  DEAD,
  createUniverse,
  getNeigthbors,
  updateStatus,
  updateCellStatus
};
