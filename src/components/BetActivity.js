import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { StackNavigator } from "react-navigation";

export default class componentName extends Component {
  static navigationOptions = {
    title: "BetActivity"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {this.props.navigation.state.params.MatchHolder.home_team}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 24,
    color: "#000000"
  }
});
