import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TextInput,
    SafeAreaView
} from "react-native";
import { useState } from "react";
import FirstStep from "./pages/firstStep";
import SecondStep from "./pages/SecondStep";
import ThirdStep from "./pages/ThirdStep";

export default function App() {
    const [selected, setSelected] = useState(0);
    return (
        <SafeAreaView style={styles.container}>
            <Text
                style={{ fontSize: 30, fontWeight: "bold", marginBottom: 40 }}
            >
                Rent a vehicle
            </Text>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 40
                }}
            >
                <View
                    style={{
                        backgroundColor: "red",
                        alignItems: "center",
                        borderRadius: 1000,
                        width: 30,
                        height: 30
                    }}
                >
                    <TouchableHighlight onPress={() => setSelected(0)}>
                        <Text style={{ fontSize: 20 }}>1</Text>
                    </TouchableHighlight>
                </View>
                <View
                    style={{
                        width: 30,
                        height: 1,
                        backgroundColor: "gray",
                        marginHorizontal: 4
                    }}
                ></View>
                <View
                    style={{
                        backgroundColor: "red",
                        alignItems: "center",
                        borderRadius: 1000,
                        width: 30,
                        height: 30
                    }}
                >
                    <TouchableHighlight onPress={() => setSelected(1)}>
                        <Text style={{ fontSize: 20 }}>2</Text>
                    </TouchableHighlight>
                </View>
                <View
                    style={{
                        width: 30,
                        height: 1,
                        backgroundColor: "gray",
                        marginHorizontal: 4
                    }}
                ></View>
                <View
                    style={{
                        backgroundColor: "red",
                        alignItems: "center",
                        borderRadius: 1000,
                        width: 30,
                        height: 30
                    }}
                >
                    <TouchableHighlight onPress={() => setSelected(2)}>
                        <Text style={{ fontSize: 20 }}>3</Text>
                    </TouchableHighlight>
                </View>
            </View>
            {selected == 0 ? (
                <FirstStep />
            ) : selected == 1 ? (
                <SecondStep />
            ) : (
                <ThirdStep />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        marginTop: 50
    }
});
