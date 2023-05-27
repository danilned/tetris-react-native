import React, { useState, useMemo, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { moveDown, setTiles } from "@src/redux/slices/tetrisSlice";
import { setBestScore } from "@src/redux/slices/appSlice";
import { setScore } from "@src/storage/storageControllers/scoreController";
import { tetrisTime } from "@src/assets/constants";
import Controller from "./Controller";
import Tile from "./Tile";

function Layout() {
  const dispatch = useDispatch();
  const tiles = useSelector((state) => state.tetris.tiles);
  const gameOver = useSelector((state) => state.tetris.gameOver);
  const score = useSelector((state) => state.tetris.score);
  const startGame = useSelector((state) => state.app.startGame);
  const bestScore = useSelector((state) => state.app.bestScore);
  const [moveDownInterval, setMoveDownInterval] = useState(null);
  const tileHeight = useMemo(
    () => +((Dimensions.get("screen").width - 140) / 10).toFixed(3),
    []
  );

  const interval = () => {
    setMoveDownInterval(
      setInterval(() => {
        dispatch(moveDown());
      }, tetrisTime)
    );
  };

  useEffect(() => {
    dispatch(
      setTiles(
        new Array(200).fill(null).map((_, index) => ({
          busy: false,
          key: `tiles-${Date.now()}-${index}`,
        }))
      )
    );

    return () => {
      clearInterval(moveDownInterval);
    };
  }, []);

  useEffect(() => {
    if (gameOver || !startGame) {
      setMoveDownInterval((prev) => {
        clearInterval(prev);
        return null;
      });

      if (score > bestScore) {
        dispatch(setBestScore(score));
        setScore(score);
      }

      return;
    }

    interval();
  }, [gameOver]);

  useEffect(() => {
    if (startGame) {
      interval();
    }
  }, [startGame]);

  return (
    <View style={styles.container}>
      <View style={styles.tiles}>
        {tiles.map((item, index) => (
          <Tile key={item.key} tile={item} index={index} height={tileHeight} />
        ))}
      </View>
      <Controller />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 70,
    paddingRight: 70,
  },
  tiles: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default Layout;
