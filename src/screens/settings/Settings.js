import React, { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet } from "react-native";
import Header from '../../component/Header';
import RadioGroup from 'react-native-radio-buttons-group';

const Settings = () => {

    const radioButtons = useMemo(() => ([
        {
            id: '1', 
            label: 'Face ID',
            value: 'faceiD'
        },
        {
            id: '2',
            label: 'Finger Print',
            value: 'fingerID'
        }
    ]), []);

    const [selectedId, setSelectedId] = useState();

    return (
        <SafeAreaView style={styles.container}>
            <Header title={"Settings"} drawer />

            <RadioGroup
                radioButtons={radioButtons}
                onPress={setSelectedId}
                selectedId={selectedId}
                containerStyle={{
                    alignItems: "flex-start"
                }}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    }
});

export default Settings;