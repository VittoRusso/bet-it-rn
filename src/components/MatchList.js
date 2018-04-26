import React, { Component } from "react";
import { View, Text, StyleSheet, SectionList, Alert } from "react-native";
import firebase from "react-native-firebase";

import Match from "./Match";

import BetActivity from "./BetActivity";

export default class MatchList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("Matches");
    this.unsubscribe = null;
    this.state = {
      loading: true,
      matches: [],
      groups: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = querySnapshot => {
    const matches = [];
    var dates = [];

    querySnapshot.forEach(doc => {
      matches.push(doc.data());
      dates.push(doc.data().date);
    });

    matches.sort(function(a, b) {
      return new Date(a.date) - new Date(b.date);
    });

    dates.sort(function(a, b) {
      return new Date(a) - new Date(b);
    });

    const groups = dates.unique();
    console.log(groups);

    this.setState({
      matches,
      loading: false,
      groups
    });
  };

  OpenPlaceBetActivity(rowData) {
    // this.props.navigation.navigate("Second", { MatchHolder: rowData });
    Alert.alert(rowData.date, rowData.home_team);
  }

  _renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <Text style={styles.loading_text}> LOADING...</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <SectionList
          //Encapsulated the item as a prop for the Match component
          renderItem={({ item }) => (
            <Match item={item} onPressItem={this.OpenPlaceBetActivity} />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.section_header}>{title}</Text>
          )}
          //Each section is a Javascript object with a group title and a list of matches as data
          //The map function takes an array (groups) and generates another from it (sections)
          //Filter takes an array and a condition and returns a subarray of items that fulfill the condition
          sections={this.state.groups.map(x => {
            return {
              title: x,
              data: this.state.matches.filter(match => match.date == x)
            };
          })}
          keyExtractor={(item, index) => item + index}
          ItemSeparatorComponent={this._renderSeparator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: "#ecf0f1",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  section_header: {
    fontStyle: "italic",
    fontSize: 16,
    color: "#c0392b",
    opacity: 0.75,
    paddingHorizontal: 16,
    paddingTop: 8
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CED0CE",
    marginHorizontal: 16
  },
  loading_text: {
    fontSize: 24
  }
});

//Dem next methods be hard-pasted from stack overflow
Array.prototype.contains = function(v) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === v) return true;
  }
  return false;
};

Array.prototype.unique = function() {
  var arr = [];
  for (var i = 0; i < this.length; i++) {
    if (!arr.includes(this[i])) {
      arr.push(this[i]);
    }
  }
  return arr;
};
