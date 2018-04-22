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

  // _renderHeader = props => <TabBar {...props} />;

  _renderHeader = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    //Se genera un boton por cada ruta
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const color = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(
              inputIndex => (inputIndex === i ? "#c0392b" : "#222")
            )
          });
          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => this.setState({ index: i })}
              key={route.title}
            >
              <Animated.Text style={{ color }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

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
    paddingTop: 0
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16
  }
});
