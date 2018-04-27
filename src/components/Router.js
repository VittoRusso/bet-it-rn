import React from "react";
import { TabNavigator } from "react-navigation";
import { Dimensions } from "react-native";

import MatchList from "./MatchList";
import AdminPanel from "./AdminPanel";

export const Tabs = TabNavigator(
  {
    Matches: {
      screen: MatchList
    },
    Panel: {
      screen: AdminPanel
    }
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: "#c0392b"
      },
      indicatorStyle: {
        backgroundColor: "#3498db"
      }
    },
    lazy: false, //Renders all tabs immediately,
    initialLayout: {
      height: 0,
      width: Dimensions.get("window").width
    }
  }
);
