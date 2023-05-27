import React from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { moveLeft, moveRight, rotateLeft } from "@src/redux/slices/tetrisSlice";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";

function Controller() {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <AntDesign
        size={45}
        name="arrowleft"
        onPress={() => {
          dispatch(moveLeft());
        }}
      />
      <Feather
        name="rotate-ccw"
        size={45}
        onPress={() => {
          dispatch(rotateLeft());
        }}
      />
      <AntDesign
        size={45}
        name="arrowright"
        onPress={() => {
          dispatch(moveRight());
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default Controller;
