import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import SubscribeScreen from "../screens/SubscribeScreen";
import MenuScreen from "../screens/MenuScreen";
import AccountScreen from "../screens/Account";
import CustomerScreen from "../screens/Customers";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'Welcome'} component={WelcomeScreen} />
      <Stack.Screen name={'Subscribe'} component={SubscribeScreen} />
      <Stack.Screen name={'Menu'} component={MenuScreen} />
      <Stack.Screen name={'Account'} component={AccountScreen} />
      <Stack.Screen name={'Customers'} component={CustomerScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
