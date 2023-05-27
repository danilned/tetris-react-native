import React from "react";
import { Modal, View, Text, StyleSheet, Pressable } from "react-native";
import { useSelector } from "react-redux";
import GameOver from "./ModalsView/GameOver";
import StartGame from "./ModalsView/StartGame";

function ModalContainer() {
  const startGame = useSelector((state) => state.app.startGame);
  const gameOver = useSelector((state) => state.tetris.gameOver);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!startGame || gameOver}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {gameOver && <GameOver />}
          {!startGame && <StartGame />}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ModalContainer;
