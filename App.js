
import 'react-native-gesture-handler'
import React from "react";
import { StyleSheet } from "react-native";
import ProductHome from './src/screens/ProductHome';
import UpdateProduct from './src/screens/UpdateProduct';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from "./src/screens/splash/SplashScreen";
import Login from "./src/screens/login/Login";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Settings from './src/screens/settings/Settings';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AppInnerStack = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={ProductHome} options={{ headerShown: false }} />
            <Drawer.Screen name="Add Product" component={UpdateProduct} options={{ headerShown: false }} />
            <Drawer.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
        </Drawer.Navigator>
    );
}

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen">
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="AppInnerStack" component={AppInnerStack} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})

export default App;