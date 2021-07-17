import { writable } from "svelte/store";

export function createLifeGame (rowSize: number, colSize: number) {
  const { subscribe, set, update } = writable(defaultState(rowSize, colSize))
  return {
    subscribe,
    toggle: (row, col) => update(state => toggle(state, row, col))
  }
}

const defaultGrid = (rowSize: number, colSize: number) => {
  const grid = [];
  for (let i = 0; i < rowSize; i++) {
    grid[i] = [];
    for (let j = 0; j < colSize; j++) {
      grid[i][j] = { isAlive: false };
    }
  }
  return grid
}

const defaultState = (rowSize: number, colSize: number) => {
  return {
    grid: defaultGrid(rowSize, colSize),
    rowSize,
    colSize
  }
}

const toggle = (oldState: any, row: number, col: number) => {
  const newState = JSON.parse(JSON.stringify(oldState))
  newState.grid[row][col] = {
    ...newState.grid[row][col],
    isAlive: !newState.grid[row][col].isAlive
  };
  return newState
}

const isCallAliveWhenNextTick = (oldState: any, row: number, col: number) => {
  const directions = [
    [-1, -1],
    [-1, +0],
    [-1, +1],
    [+0, -1],
    /* */
    [+0, +1],
    [+1, -1],
    [+1, +0],
    [+1, +1],
  ];
  let count = 0
  for (const d of directions) {
    const newRow = row + d[0]
    const newCol = col + d[1]
    if (newRow < 0 || oldState.rowSize -1 < newRow) {
      continue
    }
    if (newCol < 0 || oldState.colSize -1 < newCol) {
      continue
    }
    if (oldState.grid[newRow][newCol].isAlive) {
      count++
    }
  }
  if (oldState.grid[row][col].isAlive) {
    return getCountBool(count)
  }
  return count === 3
}

const getCountBool= (countNumber: number) => {
  // 生存
  if (countNumber === 2 || countNumber === 3) {
    return true;
  }
  // 過疎？
  if (countNumber <= 1) {
    return !(countNumber <= 1);
  }
  // 過密？
  if (countNumber >= 4) {
    return !(countNumber >= 4);
  }
}