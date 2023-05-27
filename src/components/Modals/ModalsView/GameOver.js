import React from "react";
import { useDispatch } from "react-redux";
import { Pressable, Text, StyleSheet } from "react-native";
import { startAgain } from "@src/redux/slices/tetrisSlice";

function GameOver() {
  const dispatch = useDispatch();

  return (
    <>
      <Text style={styles.modalText}>Game over</Text>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => dispatch(startAgain())}
      >
        <Text style={styles.textStyle}>Start again</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default GameOver;
