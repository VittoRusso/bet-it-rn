import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  RefreshControl
} from "react-native";
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
      matches: [],
      refreshing: false
    };
  }
  componentDidMount() {
    this.bets_unsubscriber = this.bets_ref.onSnapshot(this.onBetsUpdate);

    this.matches_unsubscriber = this.matches_ref.onSnapshot(
      this.onMatchesUpdate
    );

    this.users_unsubscriber = this.users_ref.onSnapshot(this.onUsersUpdate);
  }
  componentWillUnmount() {
    this.users_unsubscriber();
    this.matches_unsubscriber();
    this.bets_unsubscriber();
  }
  onUsersUpdate = querySnapshot => {
    var users = [];
    querySnapshot.forEach(doc => {
      var currentUser = doc.data();
      currentUser.score = this.getPoints(currentUser.email);
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
    this.users_ref.get().then(snapshot => {
      this.onUsersUpdate(snapshot);
    });
  };

  onBetsUpdate = querySnapshot => {
    var bets = [];
    querySnapshot.forEach(doc => {
      bets.push(doc.data());
    });
    this.setState({ bets });
    var users = [];
    this.users_ref.get().then(snapshot => {
      this.onUsersUpdate(snapshot);
    });
  };

  getPoints(email) {
    var myBets = this.state.bets.filter(bet => bet.user == email);
    var results = this.state.matches;
    var score = 0;
    for (var bet of myBets) {
      var resultIndex = this.getResultIndex(bet.name, results);
      if (resultIndex > -1) {
        const result = results[resultIndex];
        var increment = this.calcPoints(bet, result);
        score = score + increment;
      }
    }
    return score;
  }

  calcPoints(bet, result) {
    let bet_home = bet.home_result;
    let bet_away = bet.away_result;
    let result_home = result.home_result;
    let result_away = result.away_result;
    var points = 0;

    //Home wins
    if (result_home > result_away) {
      //Bet on home winning
      if (bet_home > bet_away) {
        points = points + 1;
        //Exact score predicted
        if (bet_home == result_home && bet_away == result_away) {
          points = points + 2;
        }
      }
    }
    //Away wins
    else if (result_away > result_home) {
      //Bet on away winning
      if (bet_away > bet_home) {
        points = points + 1;
        //Exact  score predicted
        if (bet_home == result_home && bet_away == result_away) {
          points = points + 2;
        }
      }
    }
    //Tie wins
    else {
      //Bet on tie
      if (bet_away == bet_home) {
        points = points + 1;
        if (bet_home == result_home && bet_away == result_away) {
          points = points + 2;
        }
      }
    }

    return points;
  }

  getResultIndex(name, results) {
    for (i = 0, len = results.length; i < len; ++i) {
      var currentResult = results[i];
      if (currentResult.name == name) {
        return i;
      }
    }
    return -1;
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <ListItem
      title={item.email}
      badge={{ value: item.score }}
      chevronColor="rgba(255,255,255,0)"
    />
  );

  reload() {
    this.componentWillUnmount();
    this.componentDidMount();
  }

  //This refreshes the score :D
  _onRefresh() {
    this.setState({ refreshing: true });
    this.reload();
    this.setState({ refreshing: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}> Scoreboard </Text>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
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
