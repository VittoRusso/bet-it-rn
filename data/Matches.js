import React, { Component } from "react";
import firebase from "react-native-firebase";

export default class Matches extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("Matches");
  }

  render() {
    return null;
  }
}
