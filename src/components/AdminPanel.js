import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert
} from "react-native";
import firebase from "react-native-firebase";

export default class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("Matches");
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }
  onSignOut = () => {
    firebase.auth().signOut();
  };

  onLoadData = () => {
    var raw_data = require("../../data/data.json");
    var matches = [];
    var groups = raw_data.groups;
    var teams = raw_data.teams;
    var stadiums = raw_data.stadiums;
    for (x in groups) {
      matches = matches.concat(groups[x].matches);
    }
    matches = this.sortMatches(matches, teams, stadiums);
    for (index = 0, len = matches.length; index < len; ++index) {
      this.ref.add(matches[index]).catch(err => {
        console.log(err);
      });
    }

    Alert.alert("Loaded data", "Match Count:  " + matches.length);
  };

  sortMatches(matches, teams, stadiums) {
    var flags = require("../../data/flags.json");

    for (index = 0, len = matches.length; index < len; ++index) {
      var currentMatch = matches[index];
      var newDateString = currentMatch.date.substring(0, 10).replace(/-/g, "/");
      currentMatch.date = newDateString;
      currentMatch["id"] = index;
      currentMatch["home_team"] = teams[currentMatch.home_team - 1].name;
      currentMatch["away_team"] = teams[currentMatch.away_team - 1].name;
      currentMatch["stadium"] =
        stadiums[currentMatch.stadium - 1].name +
        " ," +
        stadiums[currentMatch.stadium - 1].city;
      currentMatch["home_img"] = flags[currentMatch.home_team];
      currentMatch["away_img"] = flags[currentMatch.away_team];
      matches[index] = currentMatch;
    }
    matches.sort(function(a, b) {
      return new Date(a.date) - new Date(b.date);
    });
    return matches;
  }

  onWipeData() {
    Alert.alert(
      "Message from Google",
      "Deleting collections from an Android client is not recommended."
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          {" "}
          User:
          {this.state.user ? this.state.user.email : "hola"}
        </Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.onSignOut}
        >
          <Text style={styles.buttonText}> Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.onLoadData}
        >
          <Text style={styles.buttonText}> Load data</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.onWipeData}
        >
          <Text style={styles.buttonText}> Wipe data</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    backgroundColor: "rgba(0,0,0,0.25)",
    paddingVertical: 10,
    width: Dimensions.get("window").width - 40,
    marginTop: 20
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "700"
  }
});
