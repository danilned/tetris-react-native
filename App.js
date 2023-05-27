import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "@src/redux";
import Layout from "@src/components/Layout";

function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Layout />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
