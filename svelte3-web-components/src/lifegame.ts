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