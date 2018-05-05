import React from "react";
import { TabNavigator, StackNavigator } from "react-navigation";
import { Dimensions } from "react-native";

import MatchList from "./MatchList";
import AdminPanel from "./AdminPanel";
import BetActivity from "./BetActivity";
import BetList from "./BetList";

export const MatchesStack = StackNavigator(
  {
    MatchList: {
      screen: MatchList
    },
    BetActivity: {
      screen: BetActivity
    }
  },
  {
    headerMode: "none"
  }
);

export const Tabs = TabNavigator(
  {
    Matches: {
      screen: MatchesStack,
      navigationOptions: {
        tabBarLabel: "Matches"
      }
    },
    Bets: {
      screen: BetList,
      navigationOptions: {
        tabBarLabel: "Bets"
      }
    },
    Panel: {
      screen: AdminPanel,
      navigationOptions: {
        tabBarLabel: "Panel"
      }
    }
  },
  {
    //Icons to be implemented
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
