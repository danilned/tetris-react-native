import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Tile({ tile, index, height }) {
  return (
    <View
      style={{
        ...styles.container,
        height,
        backgroundColor: tile.busy ? "#173518" : "#ffffff",
      }}
    ></View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 0x1c1c1c,
    width: "10%",
  },
});

export default Tile;
