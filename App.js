
import 'react-native-gesture-handler'
import React from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import ProductHome from './src/screens/ProductHome';
import UpdateProduct from './src/screens/UpdateProduct';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from "./src/screens/splash/SplashScreen";
import Login from "./src/screens/login/Login";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Settings from './src/screens/settings/Settings';
import ScannerView from './src/screens/scanner/ScannerView';
import AuthService from './src/service/AuthService';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AppInnerStack = () => {
    return (
        <Drawer.Navigator initialRouteName={"Home"}
            drawerContent={props => {
                const { routeNames, index } = props.state;
                const focused = routeNames[index];

                return (
                    <>
                        <DrawerContentScrollView {...props}>
                            <View style={{ alignItems: "center", marginBottom: 20 }}>
                                <Image source={require('./src/assets/images/applogo.png')} style={{ width: 100, height: 100 }} />
                                <Text>Subhashis Routh</Text>
                            </View>
                            <DrawerItem
                                label="Home"
                                onPress={() => {
                                    props.navigation.navigate('Home');
                                }}
                                focused={focused === 'Home'}
                            // activeBackgroundColor='red'
                            // inactiveBackgroundColor='yellow'
                            // inactiveTintColor='#f3f3f3'
                            // activeTintColor='#666'
                            />
                            <DrawerItem
                                label="Add Product"
                                onPress={() => {
                                    props.navigation.navigate('AddProduct');
                                }}
                                focused={focused === 'AddProduct'}
                            />
                            <DrawerItem
                                label="Settings"
                                onPress={() => {
                                    props.navigation.navigate('Settings');
                                }}
                                focused={focused === 'Settings'}
                            />

                            <DrawerItem
                                label="Scanner"
                                onPress={() => {
                                    props.navigation.navigate('Scanner');
                                }}
                                focused={focused === 'Scanner'}
                            />

                        </DrawerContentScrollView>
                        <DrawerItem
                            label="Logout"
                            onPress={() => {
                                props.navigation.toggleDrawer();
                                AuthService.doLogout();
                                props.navigation.navigate('Login');
                            }}
                        />
                    </>
                )
            }}
        >
            <Drawer.Screen name="Home" component={ProductHome} options={{ headerShown: false }} />
            <Drawer.Screen name="AddProduct" component={UpdateProduct} options={{ headerShown: false }} />
            <Drawer.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
            <Drawer.Screen name="Scanner" component={ScannerView} options={{ headerShown: false }} />
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