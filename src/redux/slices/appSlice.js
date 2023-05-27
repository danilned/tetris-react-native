import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    startGame: false,
    bestScore: null,
  },
  reducers: {
    emitStartGame(state) {
      state.startGame = true;
    },
    setBestScore(state, { payload }) {
      state.bestScore = payload;
    },
  },
});

export default appSlice.reducer;
export const { emitStartGame, setBestScore } = appSlice.actions;
