import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  Image
} from "react-native";
import { TabViewAnimated, TabBar, SceneMap } from "react-native-tab-view";

import AdminPanel from "./AdminPanel";
import MatchList from "./MatchList";

const initialLayout = {
  height: 0,
  width: Dimensions.get("window").width
};

const FirstRoute = () => <MatchList />;
const SecondRoute = () => (
  <View style={[styles.container, { backgroundColor: "#7f8c8d" }]} />
);
const ThirdRoute = () => <AdminPanel />;

export default class TabViewExample extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: "first", title: "Matches" },
      { key: "second", title: "Bets" },
      { key: "third", title: "Panel" }
    ]
  };

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => (
    <TabBar
      {...props}
      style={styles.tabBarMe}
      indicatorStyle={styles.indicatorStyle}
    />
  );

  _renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute
  });

  render() {
    return (
      <TabViewAnimated
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
        initialLayout={initialLayout}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  tabBar: {
    flexDirection: "row",
    paddingTop: 0,
    backgroundColor: "#ecf0f1"
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16
  },
  tabBarMe: {
    backgroundColor: "#c0392b"
  },
  indicatorStyle: {
    backgroundColor: "#3498db"
    // backgroundColor: "#c0392b"
  }
});
