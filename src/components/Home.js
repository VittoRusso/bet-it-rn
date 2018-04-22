import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Alert
} from "react-native";
import firebase from "react-native-firebase";

import TabView from "./TabView";

export default class Home extends Component {
  constructor(props) {
    super(props);
    var user = props.user;
    this.state = {
      user: { user }
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

  render() {
    return <TabView user={this.state.user} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e74c3c"
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
  },
  title: {
    color: "#FFFFFF",
    marginTop: 10,
    textAlign: "center",
    opacity: 0.75
  },
  buttonContainer: {
    backgroundColor: "#c0392b",
    paddingVertical: 10
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "700"
  }
});
