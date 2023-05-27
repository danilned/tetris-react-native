import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getScore } from "@src/storage/storageControllers/scoreController";
import { setBestScore } from "@src/redux/slices/appSlice";

function Score() {
  const dispatch = useDispatch();
  const score = useSelector((state) => state.tetris.score);
  const gameOver = useSelector((state) => state.tetris.gameOver);
  const bestScore = useSelector((state) => state.app.bestScore);

  const handleAsync = async () => {
    const [bestScore] = await getScore();

    if (bestScore === null) {
      dispatch(setBestScore(0));
      return;
    }

    dispatch(setBestScore(bestScore.score));
  };

  useEffect(() => {
    handleAsync();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text
          style={[styles.align, styles.bestScore]}
        >{`Best score: ${bestScore}`}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text
          style={[styles.align, styles.currentScore]}
        >{`Your score is: ${score}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 20,
  },
  textContainer: {
    width: "100%",
  },
  align: {
    textAlign: "center",
  },
  bestScore: {
    fontSize: 13,
  },
  currentScore: {
    fontSize: 20,
  },
});

export default Score;
