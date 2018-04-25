import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableNativeFeedback,
  Alert
} from "react-native";

export default class Match extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  onPress = () => {
    Alert.alert(
      "You have pressed on the match:",
      this.props.home_team + " vs " + this.props.away_team
    );
  };
  render() {
    return (
      <TouchableNativeFeedback onPress={this.onPress}>
        <View style={styles.container}>
          <View style={styles.row_one}>
            <Image
              style={styles.flag_image}
              source={{
                uri: this.props.home_img
              }}
            />
            <Text
              style={[styles.row_item, styles.left_align]}
              numberOfLines={1}
            >
              {this.props.home_team}
            </Text>
            <Text style={[styles.row_item_half, styles.center_align]}>
              {this.props.home_score ? this.props.home_score : "-"}
            </Text>
            <Text style={[styles.row_item_half, styles.center_align]}>
              {this.props.away_score ? this.props.away_score : "-"}
            </Text>
            <Text
              style={[styles.row_item, styles.right_align]}
              numberOfLines={1}
            >
              {this.props.away_team}
            </Text>
            <Image
              style={styles.flag_image}
              source={{
                uri: this.props.away_img
              }}
            />
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  row_one: {
    flexDirection: "row",
    alignItems: "center"
  },
  container: {
    flex: 1,
    height: 72,
    paddingHorizontal: 16,
    justifyContent: "center"
  },
  row_item: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 10
  },
  row_item_half: {
    flex: 0.5,
    fontSize: 16
  },
  left_align: {
    textAlign: "left"
    // fontWeight: "bold"
  },
  right_align: {
    textAlign: "right"
    // fontWeight: "bold"
  },
  center_align: {
    textAlign: "center",
    fontWeight: "bold"
  },
  img_ph: {
    backgroundColor: "#000000",
    width: 40,
    height: 40,
    margin: 2
  },
  flag_image: {
    width: 40,
    height: 40
  }
});
