import { createSlice } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { figures } from "@src/assets/constants";
import {
  clearTiles,
  fillTiles,
  canBeMoved,
  rotate,
} from "@src/helpers/tetrisLogic";

const tetrisSlice = createSlice({
  name: "tetris",
  initialState: {
    tiles: [],
    currentFigure: null,
    gameOver: false,
    clearLevel: [],
    score: 0,
  },
  reducers: {
    setTiles(state, { payload }) {
      state.tiles = payload;
    },
    startAgain(state) {
      state.tiles = state.tiles.map((cur) => ({ ...cur, busy: false }));
      state.gameOver = false;
      state.score = 0;
    },
    moveDown(state) {
      if (state.clearLevel.length) {
        state.clearLevel.forEach((i) => {
          state.score += 1;
          for (let k = 0; k < 10; k++) {
            state.tiles[i * 10 + k].busy = false;
          }
        });

        state.clearLevel = [];
      }

      if (state.currentFigure === null) {
        state.currentFigure = [
          ...figures[Math.floor(figures.length * Math.random())],
        ];
        return;
      }

      let isFalled = false;
      let [min_y, max_y] = [19, 0];
      const lowest_dots = [];

      for (let i = 0; i < state.currentFigure.length; i++) {
        const [x, y] = state.currentFigure[i];

        if (!lowest_dots.some(([cur_x, cur_y]) => cur_x === x && cur_y > y)) {
          lowest_dots.push([x, y]);
        }
      }

      for (let i in state.currentFigure) {
        const [x, y] = state.currentFigure[i];
        const is_lowest = lowest_dots.some(
          ([cur_x, cur_y]) => cur_x === x && cur_y === y
        );

        if (y < 0) {
          state.currentFigure[i] = [x, y + 1];
          continue;
        }

        if (y >= 19 || (state.tiles[(y + 1) * 10 + x].busy && is_lowest)) {
          isFalled = true;
        }

        min_y = Math.min(y, min_y);
        max_y = Math.max(y, max_y);

        state.currentFigure[i] = [x, y + 1];
        state.tiles[y * 10 + x].busy = true;

        if (y >= 1) {
          state.tiles[(y - 1) * 10 + x].busy = false;
        }
      }

      if (isFalled) {
        for (let i = max_y; i >= min_y; i--) {
          let clearLevel = true;
          for (let k = 0; k < 10; k++) {
            if (!state.tiles[i * 10 + k].busy) {
              clearLevel = false;
              break;
            }
          }

          if (clearLevel) {
            if (i === 0) {
              min_y = 1;
            }

            state.clearLevel.push(i);
          }
        }

        if (min_y <= 0) {
          state.gameOver = true;
        }

        state.currentFigure = null;
      }
    },
    moveRight(state) {
      if (state.currentFigure === null) {
        return;
      }

      const figure = state.currentFigure.map(([x, y]) => [x + 1, y]);
      const tiles = clearTiles(state.currentFigure, cloneDeep(state.tiles));

      if (canBeMoved(figure, tiles)) {
        state.currentFigure = figure;
        state.tiles = fillTiles(figure, tiles);
      }
    },
    moveLeft(state) {
      if (state.currentFigure === null) {
        return;
      }

      const figure = state.currentFigure.map(([x, y]) => [x - 1, y]);
      const tiles = clearTiles(state.currentFigure, cloneDeep(state.tiles));

      if (canBeMoved(figure, tiles)) {
        state.currentFigure = figure;
        state.tiles = fillTiles(figure, tiles);
      }
    },
    rotateLeft(state) {
      if (state.currentFigure === null) {
        return;
      }

      const figure = rotate(cloneDeep(state.currentFigure));
      const tiles = clearTiles(state.currentFigure, cloneDeep(state.tiles));

      if (canBeMoved(figure, tiles)) {
        state.currentFigure = figure;
        state.tiles = fillTiles(figure, tiles);
      }
    },
  },
});

export default tetrisSlice.reducer;
export const {
  setTiles,
  startAgain,
  moveDown,
  moveRight,
  moveLeft,
  rotateLeft,
} = tetrisSlice.actions;
