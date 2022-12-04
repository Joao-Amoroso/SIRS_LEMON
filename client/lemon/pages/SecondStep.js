import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TextInput,
    SafeAreaView
} from "react-native";
import React from "react";
export default function SecondStep() {
    return (
        <React.Fragment>
            <View style={{ width: "70%", minWidth: 250 }}>
                <Text
                    style={{
                        fontSize: 20,
                        marginBottom: 15,
                        textAlign: "center"
                    }}
                >
                    Authentication
                </Text>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ marginBottom: 5 }}>Username</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            paddingVertical: 3,
                            paddingHorizontal: 5,

                            borderRadius: 5
                        }}
                        placeholder="Enter username"
                    />
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ marginBottom: 5 }}>Password</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            paddingVertical: 3,
                            paddingHorizontal: 5,

                            borderRadius: 5
                        }}
                        placeholder="Enter password"
                    />
                </View>

                <TouchableHighlight>
                    <View
                        style={{
                            backgroundColor: "#0d6efd",
                            padding: 10,
                            alignItems: "center",

                            borderRadius: 5
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontSize: 20
                            }}
                        >
                            Authenticate
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        </React.Fragment>
    );
}
