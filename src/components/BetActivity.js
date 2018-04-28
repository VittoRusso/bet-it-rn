import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert
} from "react-native";
import { StackNavigator } from "react-navigation";
import { Button } from "react-native-elements";

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      match: this.props.navigation.state.params,
      home_score: 0,
      away_score: 0
    };
  }

  _increaseHomeScore = () => {
    this.setState(prevState => {
      return {
        home_score: prevState.home_score + 1
      };
    });
  };

  _increaseAwayScore = () => {
    this.setState(prevState => {
      return {
        away_score: prevState.away_score + 1
      };
    });
  };

  _decreaseHomeScore = () => {
    this.setState(prevState => {
      return {
        home_score:
          prevState.home_score > 0
            ? prevState.home_score - 1
            : prevState.home_score
      };
    });
  };

  _decreaseAwayScore = () => {
    this.setState(prevState => {
      return {
        away_score:
          prevState.away_score > 0
            ? prevState.away_score - 1
            : prevState.away_score
      };
    });
  };

  _placeBet = () => {
    Alert.alert("Bet");
  };

  _goBack = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}> {this.state.match.home_team} </Text>
          <Text style={styles.title}> {this.state.match.away_team} </Text>
        </View>
        <View style={styles.button_row}>
          <TouchableOpacity
            style={styles.button}
            onPress={this._increaseHomeScore}
          >
            <Text style={styles.button_text}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this._increaseAwayScore}
          >
            <Text style={styles.button_text}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row} flex={1}>
          <Text style={styles.score}> {this.state.home_score} </Text>
          <Text style={styles.score}> {this.state.away_score} </Text>
        </View>
        <View style={styles.button_row}>
          <TouchableOpacity
            style={styles.button}
            onPress={this._decreaseHomeScore}
          >
            <Text style={styles.button_text}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this._decreaseAwayScore}
          >
            <Text style={styles.button_text}>-</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}> {this.state.match.date} </Text>
        <Text style={styles.title}> {this.state.match.stadium} </Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={this._placeBet}>
            <Text style={styles.button_text2}>PLACE BET</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={this._goBack}>
            <Text style={styles.button_text2}>GO BACK</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 20,
    paddingHorizontal: 16
  },
  title: {
    fontSize: 24,
    color: "#000000",
    textAlign: "center",
    flex: 1
  },
  row: {
    flexDirection: "row",
    flex: 1
  },
  button_row: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  score: {
    fontSize: 84,
    color: "#000000",
    textAlign: "center",
    flex: 1
  },
  button: {
    flex: 1,
    backgroundColor: "#000000",
    opacity: 0.75,
    alignItems: "center",
    justifyContent: "center",
    margin: 2
  },
  button_text: {
    color: "white",
    fontSize: 48,
    fontWeight: "bold"
  },
  button_text2: {
    color: "white",
    fontSize: 24
  }
});
