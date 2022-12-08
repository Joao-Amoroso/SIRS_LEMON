import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TextInput,
    SafeAreaView,
    Image,
    StatusBar
} from "react-native";
import { Asset, useAssets } from "expo-asset";
import { useState } from "react";
export default function Login({ navigation }) {
    const [assets, error] = useAssets([require("../assets/lemon.png")]);
    const [focus, setFocus] = useState(false);
    const [focus1, setFocus1] = useState(false);
    return (
        <SafeAreaView
            style={{
                flex: 1,
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginTop: StatusBar.currentHeight
            }}
        >
            <View style={{ maxWidth: 300, width: "100%" }}>
                {assets ? (
                    <View
                        class="d-flex justify-content-center align-items-center mb-3"
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            marginBottom: 18
                        }}
                    >
                        <Image
                            style={{
                                width: 70,
                                height: 70
                            }}
                            source={assets[0]}
                            alt="Lemon"
                        />
                    </View>
                ) : null}
                <Text
                    style={{
                        textAlign: "center",
                        marginBottom: 19,
                        fontSize: 40
                    }}
                >
                    Login
                </Text>
                <View
                    style={{
                        marginBottom: 16
                    }}
                >
                    <Text
                        style={{
                            marginBottom: 8
                        }}
                    >
                        Username
                    </Text>
                    <TextInput
                        style={[
                            styles.input,
                            focus ? styles.inputFocus : null,
                            focus ? styles.boxShadow : null
                        ]}
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                    />
                </View>
                <View
                    style={{
                        marginBottom: 20
                    }}
                >
                    <Text
                        style={{
                            marginBottom: 8
                        }}
                    >
                        Password
                    </Text>
                    <TextInput
                        style={[
                            styles.input,
                            focus1 ? styles.inputFocus : null,
                            focus1 ? styles.boxShadow : null
                        ]}
                        secureTextEntry={true}
                        onFocus={() => setFocus1(true)}
                        onBlur={() => setFocus1(false)}
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
                            Login
                        </Text>
                    </View>
                </TouchableHighlight>
                <Text
                    style={{
                        textAlign: "center",
                        marginTop: 16
                    }}
                >
                    Don't have an account?{" "}
                    <Text
                        onPress={() => navigation.navigate("Register")}
                        style={{
                            color: "#0d6efd",
                            textDecorationLine: "underline"
                        }}
                    >
                        register here
                    </Text>
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        marginTop: 50
    },
    input: {
        fontSize: 16,
        lineHeight: 1.5,
        backgroundColor: "white",
        borderColor: "#ced4da",
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 6,
        margin: 0,
        color: "#212529",
        outlineColor: "#523009",
        outlineStyle: "solid",
        outlineWidth: 10
    },
    inputFocus: {
        borderColor: "#86b7fe"
    }
});
const generateBoxShadowStyle = (
    xOffset,
    yOffset,
    shadowColorIos,
    shadowOpacity,
    shadowRadius,
    elevation,
    shadowColorAndroid
) => {
    if (Platform.OS === "ios") {
        styles.boxShadow = {
            shadowColor: shadowColorIos,
            shadowOffset: { width: xOffset, height: yOffset },
            shadowOpacity,
            shadowRadius
        };
    } else if (Platform.OS === "android") {
        styles.boxShadow = {
            elevation,
            shadowColor: shadowColorAndroid
        };
    }
};
generateBoxShadowStyle(
    0,
    1,
    "rgb(13 110 253 / 25%)",
    0.22,
    3,
    3,
    "rgb(13 110 253 / 25%)"
);
