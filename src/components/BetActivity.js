import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  ToastAndroid
} from "react-native";
import { StackNavigator } from "react-navigation";
import { Button } from "react-native-elements";
import firebase from "react-native-firebase";

export default class BetActivity extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("Bets");
    this.ref2 = firebase.firestore().collection("Users");
    var home_score = this.props.navigation.state.params.home_result;
    var away_score = this.props.navigation.state.params.away_result;

    this.state = {
      match: this.props.navigation.state.params,
      home_score: home_score ? home_score : 0,
      away_score: away_score ? away_score : 0,
      user: null,
      isAdmin: false,
      home_wins: 0,
      away_wins: 0,
      tie: 0,
      perfect_bets: 0,
      ok_bets: 0,
      sad_bets: 0
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

  componentDidMount() {
    this.mounted = true;
    this.unsubscriber = firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user
      });
      var adminQuery = this.ref2.where("email", "==", user.email);
      //This implements admin super powers
      adminQuery
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.setState({
              isAdmin: doc.data().isAdmin
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
    if (this.state.match.isResult) {
      this.getResultsCount();
    } else {
      this.getBetCount();
    }
  }

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
    this.mounted = false;
  }

  _placeBet = () => {
    if (this.state.match.isResult) {
      Alert.alert("You cannot bet on a result");
      this.props.navigation.pop();
    } else {
      var bet = this.state.match;
      bet.home_result = this.state.home_score;
      bet.away_result = this.state.away_score;
      bet.user = this.state.user.email;
      this.ref.add(bet).catch(err => {
        console.log(err);
      });
      ToastAndroid.show("Bet Placed", ToastAndroid.SHORT);
      this.props.navigation.pop();
    }
  };

  _placeResult = () => {
    //Get the match unique ID
    const match = this.state.match;
    console.log(match._uid);
    const match_ref = firebase
      .firestore()
      .collection("Matches")
      .doc(match._uid);
    const data = {
      home_result: this.state.home_score,
      away_result: this.state.away_score,
      isResult: true
    };
    console.log("got here");
    match_ref.update(data).then(() => {
      console.log("Data updated");
    });

    ToastAndroid.show("Result Placed", ToastAndroid.SHORT);
    this.props.navigation.pop();
  };

  _goBack = () => {
    this.props.navigation.pop();
  };

  getBetCount = () => {
    var betQuery = firebase
      .firestore()
      .collection("Bets")
      .where("name", "==", this.state.match.name);
    var myBets = [];
    betQuery.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        myBets.push(doc.data());
      });
      var home_wins = myBets.filter(x => x.home_result > x.away_result).length;
      var away_wins = myBets.filter(x => x.away_result > x.home_result).length;
      var tie = myBets.filter(x => x.home_result == x.away_result).length;
      this.setState({
        home_wins,
        away_wins,
        tie
      });
    });
  };

  getResultsCount = () => {
    var betQuery = firebase
      .firestore()
      .collection("Bets")
      .where("name", "==", this.state.match.name);
    var myBets = [];
    betQuery.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        myBets.push(doc.data());
      });
      console.log(myBets);
      var home_score = this.state.home_score;
      var away_score = this.state.away_score;
      var perfect_bets = myBets.filter(
        x => x.home_result == home_score && x.away_result == away_score
      ).length;

      //Esta es una de las vainas mas obscenas que he hecho mk sorry
      var ok_bets =
        myBets.filter(
          x =>
            (x.home_result > x.away_result && home_score > away_score) ||
            (x.home_result < x.away_result && home_score < away_score) ||
            (x.home_result == x.away_result && home_score == away_score)
        ).length - perfect_bets;
      var sad_bets = myBets.length - perfect_bets - ok_bets;
      this.setState({ perfect_bets, ok_bets, sad_bets });
    });
  };

  render() {
    const placeBetButton = (
      <TouchableOpacity
        style={[styles.button, styles.controlHeight]}
        onPress={this.state.isAdmin ? this._placeResult : this._placeBet}
      >
        <Text style={styles.button_text2}>
          {this.state.isAdmin ? "SET RESULT" : "PLACE BET"}
        </Text>
      </TouchableOpacity>
    );
    const goBackButton = (
      <TouchableOpacity
        style={[styles.button, styles.controlHeight]}
        onPress={this._goBack}
      >
        <Text style={styles.button_text2}>GO BACK</Text>
      </TouchableOpacity>
    );

    const betStats = (
      <View style={styles.statsContainer}>
        <Text style={styles.stats}>
          Bets on home win: {this.state.home_wins}
        </Text>
        <Text style={styles.stats}>Bets on tie: {this.state.tie} </Text>
        <Text style={styles.stats}>
          Bets on away win: {this.state.away_wins}
        </Text>
      </View>
    );

    const resultStats = (
      <View style={styles.statsContainer}>
        <Text style={styles.stats}>
          Perfect bets (3 pts.): {this.state.perfect_bets}
        </Text>
        <Text style={styles.stats}>Ok bets (1 pt.): {this.state.ok_bets} </Text>
        <Text style={styles.stats}>
          Sad bets (0 pts.): {this.state.sad_bets}
        </Text>
      </View>
    );

    return (
      <View style={styles.container}>
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

          <View style={styles.row} flex={2}>
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
        </View>

        <View style={styles.container}>
          <Text style={styles.title}> {this.state.match.date} </Text>
          <Text style={styles.title}> {this.state.match.stadium} </Text>
          {this.state.match.isResult ? resultStats : betStats}
          <View style={styles.row}>
            {placeBetButton}
            {goBackButton}
          </View>
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
    paddingHorizontal: 16,
    marginBottom: 20
  },
  title: {
    fontSize: 20,
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
    margin: 2,
    borderRadius: 4
  },
  button_text: {
    color: "white",
    fontSize: 48,
    fontWeight: "bold"
  },
  button_text2: {
    color: "white",
    fontSize: 24
  },
  controlHeight: {
    height: 72
  },
  statsContainer: {
    width: Dimensions.get("window").width - 32,
    height: 100,
    // borderWidth: 2,
    // borderColor: "rgba(0,0,0,1.0)",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 10
  },
  stats: {
    fontSize: 16,
    color: "rgba(20,20,20,1.0)"
  }
});
