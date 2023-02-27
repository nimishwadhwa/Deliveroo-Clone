import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { TailWindProvider } from "nativewind";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import RestaurentScreen from "./screens/RestaurentScreen";
import BasketScreen from "./screens/BasketScreen";
import PreparingOrderScreen from "./screens/PreparingOrderScreen";
import DeliveryScreen from "./screens/DeliveryScreen";
import { Provider } from "react-redux";
import store from "./store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Restaurent" component={RestaurentScreen} />
          <Stack.Screen
            name="Basket"
            component={BasketScreen}
            options={{ presentation: "modal", headerShown: false }}
          />
          <Stack.Screen
            name="PreparingOrderScreen"
            options={{ presentation: "fullScreenModal", headerShown: false }}
            component={PreparingOrderScreen}
          />
          <Stack.Screen
            name="Delivery"
            options={{ presentation: "fullScreenModal", headerShown: false }}
            component={DeliveryScreen}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
