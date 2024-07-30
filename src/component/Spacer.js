import React from "react";
import { View } from "react-native";

const Spacer = ({ horizontal, size, ...props }) => {

    const defaultValue = 'auto';

    return (
        <View
            testID="spacer"
            style={{
                width: horizontal ? size : defaultValue,
                height: !horizontal ? size : defaultValue
            }}
        />
    );
}

export default Spacer;