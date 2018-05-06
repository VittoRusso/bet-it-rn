import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import firebase from "react-native-firebase";
import { ListItem } from "react-native-elements";

export default class UserList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.users_ref = firebase.firestore().collection("Users");
    this.matches_ref = firebase.firestore().collection("Matches");
    this.bets_ref = firebase.firestore().collection("Bets");
    this.state = {
      users: [],
      bets: [],
      matches: []
    };
  }
  componentDidMount() {
    this.users_unsubscriber = this.users_ref.onSnapshot(this.onUsersUpdate);
    this.matches_unsubscriber = this.matches_ref.onSnapshot(
      this.onMatchesUpdate
    );
    this.bets_unsibscriber = this.bets_ref.onSnapshot(this.onBetsUpdate);
  }
  componentWillUnmount() {
    this.users_unsubscriber();
    this.matches_unsubscriber();
  }
  onUsersUpdate = querySnapshot => {
    var users = [];
    querySnapshot.forEach(doc => {
      var currentUser = doc.data();
      currentUser.score = this.getScore(currentUser.email);
      users.push(currentUser);
    });
    this.setState({ users });
  };

  onMatchesUpdate = querySnapshot => {
    var matches = [];
    querySnapshot.forEach(doc => {
      var currentMatch = doc.data();
      if (currentMatch.isResult) {
        matches.push(currentMatch);
      }
    });
    this.setState({ matches });
  };

  onBetsUpdate = querySnapshot => {
    var bets = [];
    querySnapshot.forEach(doc => {
      bets.push(doc.data());
    });
    this.setState({ bets });
  };

  getScore(email) {
    return 0;
  }
  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <ListItem
      title={item.email}
      badge={{ value: item.score }}
      chevronColor="rgba(255,255,255,0)"
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}> Scoreboard </Text>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.users}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    margin: 16,
    fontSize: 24,
    width: Dimensions.get("screen").width,
    height: 50,
    fontWeight: "bold",
    color: "#000000"
  }
});
