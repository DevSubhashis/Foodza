import React from "react";
import { StyleSheet } from "react-native";
import ProductHome from './src/screens/ProductHome';
import UpdateProduct from './src/screens/UpdateProduct';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="ProductHome">
                <Stack.Screen name="ProductHome" component={ProductHome} options={{ headerShown: false }} />
                <Stack.Screen name="UpdateProduct" component={UpdateProduct} options={{ headerShown: false }} />
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