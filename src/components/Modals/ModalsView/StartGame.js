import React from "react";
import { useDispatch } from "react-redux";
import { Pressable, Text, StyleSheet } from "react-native";
import { emitStartGame } from "@src/redux/slices/appSlice";

function StartGame() {
  const dispatch = useDispatch();

  return (
    <>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => {
          dispatch(emitStartGame());
        }}
      >
        <Text style={styles.textStyle}>Start game</Text>
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

export default StartGame;
