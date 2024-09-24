import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { useProductContext } from '../context/ProductContext';

const Loader = () => {

    const { loader } = useProductContext();

    return (
        loader && <View style={styles.container}>
            <Image 
                source={require('../assets/images/Loading.gif')}
                style={{ width: 120, height: 120, backgroundColor: 'transparent' }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        height: '100%',
        width: '100%',
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "center",
        backgroundColor: 'rgba(80, 80, 80, .95)',
        zIndex: 9999
    }
})

export default Loader;