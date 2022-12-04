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
export default function FirstStep() {
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
                    Vehicle to rent
                </Text>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ marginBottom: 5 }}>Vehicle ID</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            paddingVertical: 3,
                            paddingHorizontal: 5,

                            borderRadius: 5
                        }}
                        placeholder="Enter vehicle id"
                    />
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ marginBottom: 5 }}>Duration</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            paddingVertical: 3,
                            paddingHorizontal: 5,

                            borderRadius: 5
                        }}
                        placeholder="ex: hh:mm"
                    />
                </View>
                <View
                    style={{
                        marginBottom: 20
                    }}
                >
                    <Text style={{ fontSize: 18 }}>Cost: 0$</Text>
                    <Text style={{ color: "gray" }}>
                        <Text>1$</Text> per 10min
                    </Text>
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
                            Rent
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        </React.Fragment>
    );
}
