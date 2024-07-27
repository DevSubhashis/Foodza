import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import ProductHome from './src/screens/ProductHome';

const App = () => {
    return(
        <SafeAreaView style={styles.container}>
            <ProductHome />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})

export default App;