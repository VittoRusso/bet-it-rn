import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

export default class Match extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row_one}>
          <Text style={styles.date_text}>{this.props.date}</Text>
        </View>
        <View style={styles.row_one}>
          <Text style={[styles.row_item, styles.left_align]}>
            {this.props.home_team}
            {""}
          </Text>
          <Text style={[styles.row_item, styles.center_align]}>
            {this.props.home_score ? this.props.home_score : "-"}
            {""}
          </Text>
          <Text style={[styles.row_item, styles.center_align]}>
            {this.props.away_score ? this.props.away_score : "-"}
            {""}
          </Text>
          <Text style={[styles.row_item, styles.right_align]}>
            {this.props.away_team}
            {""}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row_one: {
    flexDirection: "row"
  },
  container: {
    flex: 1,
    height: 88,
    paddingVertical: 20,
    paddingHorizontal: 16
  },
  row_item: {
    flex: 1,
    fontSize: 16
  },
  left_align: {
    textAlign: "left",
    fontWeight: "bold"
  },
  right_align: {
    textAlign: "right",
    fontWeight: "bold"
  },
  center_align: {
    textAlign: "center"
  },
  date_text: {
    fontSize: 14,
    fontStyle: "italic"
  }
});
