import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const Loader = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
            <ActivityIndicator />;
        </View>
    )
}

export default Loader