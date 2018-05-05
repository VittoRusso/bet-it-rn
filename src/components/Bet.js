import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";

export default class Match extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  onPress = () => {
    this.props.onPressItem();
  };
  render() {
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View
          style={
            this.props.item.isMine ? styles.bluish_container : styles.container
          }
        >
          <View style={styles.row_one}>
            <Image
              style={styles.flag_image}
              source={{
                uri: this.props.item.home_img
              }}
            />
            <Text
              style={[styles.row_item, styles.left_align]}
              numberOfLines={1}
            >
              {this.props.item.home_team}
            </Text>
            <Text style={[styles.row_item_half, styles.center_align]}>
              {this.props.item.home_result ? this.props.item.home_result : 0}
            </Text>
            <Text style={[styles.row_item_half, styles.center_align]}>
              {this.props.item.away_result ? this.props.item.away_result : 0}
            </Text>
            <Text
              style={[styles.row_item, styles.right_align]}
              numberOfLines={1}
            >
              {this.props.item.away_team}
            </Text>
            <Image
              style={styles.flag_image}
              source={{
                uri: this.props.item.away_img
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
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
    justifyContent: "center",
    backgroundColor: "rgba(241, 196, 15,0.1)"
  },
  bluish_container: {
    flex: 1,
    height: 72,
    paddingHorizontal: 16,
    justifyContent: "center",
    backgroundColor: "rgba(52, 152, 219,0.2)"
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
