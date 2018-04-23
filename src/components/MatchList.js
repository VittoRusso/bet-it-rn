import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import firebase from "react-native-firebase";

import Match from "./Match";

export default class MatchList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("Matches");
    this.unsubscribe = null;
    this.state = {
      loading: true,
      matches: []
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

    querySnapshot.forEach(doc => {
      matches.push(doc.data());
    });

    matches.sort(function(a, b) {
      return new Date(a.date) - new Date(b.date);
    });

    this.setState({
      matches,
      loading: false
    });
  };

  _keyExtractor = (item, index) => item.id;

  _renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE"
        }}
      />
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <Text> LOADING... </Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.matches}
          renderItem={({ item }) => <Match {...item} />}
          keyExtractor={item => item.id.toString()}
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
  }
});
