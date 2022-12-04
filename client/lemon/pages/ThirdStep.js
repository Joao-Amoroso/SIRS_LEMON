import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView
} from "react-native";
import React from "react";
export default function ThirdStep() {
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
                    Payment
                </Text>
                <View style={{ marginBottom: 15 }}>
                    <TouchableHighlight>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: "#0d6efd",
                                padding: 10,
                                alignItems: "center",
                                borderRadius: 5,
                                marginBottom: 10
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16
                                }}
                            >
                                Credit Card
                            </Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: "gray",
                                padding: 10,
                                alignItems: "center",

                                borderRadius: 5
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16
                                }}
                            >
                                Debit Card
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ marginBottom: 5 }}>Name on card</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            paddingVertical: 3,
                            paddingHorizontal: 5,

                            borderRadius: 5
                        }}
                        placeholder=""
                    />
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ marginBottom: 5 }}>Credit card number</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            paddingVertical: 3,
                            paddingHorizontal: 5,

                            borderRadius: 5
                        }}
                        keyboardType="numeric"
                        placeholder="0000 0000 0000 0000"
                    />
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ marginBottom: 5 }}>Expiration date</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            paddingVertical: 3,
                            paddingHorizontal: 5,

                            borderRadius: 5
                        }}
                        placeholder="MM/AA"
                    />
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ marginBottom: 5 }}>CVV</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            paddingVertical: 3,
                            paddingHorizontal: 5,

                            borderRadius: 5
                        }}
                        placeholder="000"
                    />
                </View>
                <View
                    style={{
                        marginBottom: 20
                    }}
                >
                    <Text style={{ fontSize: 18 }}>Total: 125$</Text>
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
                            Pay
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        </React.Fragment>
    );
}
