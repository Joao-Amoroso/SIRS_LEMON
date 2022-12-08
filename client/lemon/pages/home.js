import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TextInput,
    SafeAreaView,
    Image,
    ScrollView,
    StatusBar
} from "react-native";
import { Asset, useAssets } from "expo-asset";
import { useState } from "react";

export default function Home() {
    const [assets, error] = useAssets([require("../assets/lemon.png")]);
    const [payment, setPayment] = useState("credit"); // credit or debit
    const [focus1, setFocus1] = useState(false);
    const [focus2, setFocus2] = useState(false);
    const [focus3, setFocus3] = useState(false);
    const [focus4, setFocus4] = useState(false);
    const [focus5, setFocus5] = useState(false);
    const [focus6, setFocus6] = useState(false);

    return (
        <SafeAreaView
            style={{
                marginTop: StatusBar.currentHeight
            }}
        >
            <ScrollView>
                <View
                    class="d-flex justify-content-between py-3 px-4 mb-4 border-bottom shadow-sm bg-dark"
                    style={[
                        {
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingHorizontal: 18,
                            paddingVertical: 16,
                            marginBottom: 18,
                            backgroundColor: "#212529"
                        },
                        styles.boxShadow
                    ]}
                >
                    {assets ? (
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row"
                            }}
                            class="d-flex justify-content-center align-items-center mb-3"
                        >
                            <Image
                                style={{
                                    width: 35,
                                    height: 35,
                                    marginRight: 8,
                                    resizeMode: "contain"
                                }}
                                source={assets[0]}
                                alt="Lemon"
                            />
                            <Text style={{ color: "white", fontSize: 28 }}>
                                Lemon
                            </Text>
                        </View>
                    ) : null}
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
                                Log out
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View
                    class="container w-100 min-vh-100 mb-5"
                    style={{
                        marginBottom: 35,
                        marginTop: 35,
                        paddingHorizontal: 25
                    }}
                >
                    <Text
                        class="text-center mb-5"
                        style={{
                            fontSize: 35,
                            textAlign: "center",
                            marginBottom: 30
                        }}
                    >
                        Rent a vehicle
                    </Text>
                    <View>
                        <Text
                            class="mb-3"
                            style={{ fontSize: 24 }}
                        >
                            Travel
                        </Text>

                        <View class="row g-3">
                            <View
                                class="col-12"
                                style={{
                                    marginTop: 18,
                                    marginBottom: 18
                                }}
                            >
                                <Text
                                    for="vehicle-id"
                                    class="form-label"
                                    style={{ marginBottom: 3 }}
                                >
                                    Vehicle ID
                                </Text>
                                <TextInput
                                    type="text"
                                    class="form-control"
                                    id="vehicle-id"
                                    placeholder="Enter vehicle identifier"
                                    required
                                    style={[
                                        styles.input,
                                        focus1 ? styles.inputFocus : null,
                                        focus1 ? styles.boxShadow : null
                                    ]}
                                    onFocus={() => setFocus1(true)}
                                    onBlur={() => setFocus1(false)}
                                />
                            </View>

                            <View
                                class="col-12"
                                style={{
                                    marginBottom: 18
                                }}
                            >
                                <Text
                                    for="duration"
                                    class="form-label"
                                    style={{ marginBottom: 3 }}
                                >
                                    Duration
                                </Text>
                                <TextInput
                                    style={[
                                        styles.input,
                                        focus2 ? styles.inputFocus : null,
                                        focus2 ? styles.boxShadow : null
                                    ]}
                                    onFocus={() => setFocus2(true)}
                                    onBlur={() => setFocus2(false)}
                                    type="text"
                                    class="form-control"
                                    id="duration"
                                    placeholder="hh:mm"
                                    required
                                />
                                <Text class="text-muted">1$/10min</Text>
                            </View>
                        </View>

                        <View
                            class="my-4"
                            style={{
                                borderColor: "black",
                                borderBottomWidth: 1,
                                marginVertical: 20,
                                opacity: 0.2
                            }}
                        />

                        <Text
                            class="mb-3"
                            style={{ fontSize: 24, marginBottom: 16 }}
                        >
                            Payment
                        </Text>

                        <View
                            class="my-3"
                            style={{
                                alignSelf: "flex-start",
                                marginVertical: 16,
                                flexDirection: "row"
                            }}
                        >
                            <TouchableHighlight
                                style={{
                                    flex: 1,

                                    borderBottomLeftRadius: 6,
                                    borderTopLeftRadius: 6
                                }}
                                onPress={() => setPayment("credit")}
                            >
                                <View
                                    class="form-check"
                                    style={{
                                        borderColor: "#0d6efd",
                                        borderWidth: 1,
                                        padding: 20,
                                        backgroundColor:
                                            payment == "credit"
                                                ? "#0d6efd"
                                                : "#fefefe",

                                        borderBottomLeftRadius: 6,
                                        borderTopLeftRadius: 6,

                                        flex: 1
                                    }}
                                >
                                    <Text
                                        style={{
                                            color:
                                                payment == "credit"
                                                    ? "white"
                                                    : "black",
                                            textAlign: "center"
                                        }}
                                    >
                                        Credit card
                                    </Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={{
                                    flex: 1,
                                    borderBottomRightRadius: 6,
                                    borderTopRightRadius: 6
                                }}
                                onPress={() => setPayment("debit")}
                            >
                                <View
                                    class="form-check"
                                    style={{
                                        borderColor: "#0d6efd",
                                        borderWidth: 1,
                                        padding: 20,
                                        backgroundColor:
                                            payment == "debit"
                                                ? "#0d6efd"
                                                : "#fefefe",
                                        borderBottomRightRadius: 6,
                                        borderTopRightRadius: 6,

                                        flex: 1
                                    }}
                                >
                                    <Text
                                        class="form-check-label"
                                        for="debit"
                                        style={{
                                            textAlign: "center",
                                            color:
                                                payment == "debit"
                                                    ? "white"
                                                    : "black"
                                        }}
                                    >
                                        Debit card
                                    </Text>
                                </View>
                            </TouchableHighlight>
                        </View>

                        <View class="row gy-3">
                            <View
                                class="col-md-6"
                                style={{ marginBottom: 16 }}
                            >
                                <Text
                                    for="cc-name"
                                    class="form-label"
                                    style={{ marginBottom: 3 }}
                                >
                                    Name on card
                                </Text>
                                <TextInput
                                    style={[
                                        styles.input,
                                        focus3 ? styles.inputFocus : null,
                                        focus3 ? styles.boxShadow : null
                                    ]}
                                    onFocus={() => setFocus3(true)}
                                    onBlur={() => setFocus3(false)}
                                    type="text"
                                    class="form-control"
                                    id="cc-name"
                                    placeholder=""
                                    required=""
                                />
                                <Text
                                    class="text-muted"
                                    style={{
                                        color: "#6c757d",
                                        fontSize: 14,
                                        marginTop: 5
                                    }}
                                >
                                    Full name as displayed on card
                                </Text>
                            </View>

                            <View
                                class="col-md-6"
                                style={{ marginBottom: 16 }}
                            >
                                <Text
                                    for="cc-number"
                                    class="form-label"
                                    style={{ marginBottom: 3 }}
                                >
                                    Credit card number
                                </Text>
                                <TextInput
                                    style={[
                                        styles.input,
                                        focus4 ? styles.inputFocus : null,
                                        focus4 ? styles.boxShadow : null
                                    ]}
                                    onFocus={() => setFocus4(true)}
                                    onBlur={() => setFocus4(false)}
                                    type="text"
                                    class="form-control"
                                    id="cc-number"
                                    placeholder="0000 0000 0000 0000"
                                    required=""
                                    keyboardType="number-pad"
                                    maxLength={16}
                                />
                            </View>
                            <View
                                style={{
                                    marginBottom: 16,
                                    flexDirection: "row"
                                }}
                            >
                                <View
                                    class="col-md-3"
                                    style={{ width: 150 }}
                                >
                                    <Text
                                        for="cc-expiration"
                                        class="form-label"
                                        style={{ marginBottom: 3 }}
                                    >
                                        Expiration
                                    </Text>
                                    <TextInput
                                        style={[
                                            styles.input,
                                            focus5 ? styles.inputFocus : null,
                                            focus5 ? styles.boxShadow : null
                                        ]}
                                        onFocus={() => setFocus5(true)}
                                        onBlur={() => setFocus5(false)}
                                        type="text"
                                        class="form-control"
                                        id="cc-expiration"
                                        placeholder="20/12"
                                        required=""
                                    />
                                </View>

                                <View
                                    class="col-md-3"
                                    style={{ width: 80, marginLeft: 30 }}
                                >
                                    <Text
                                        for="cc-cvv"
                                        class="form-label"
                                        style={{ marginBottom: 3 }}
                                    >
                                        CVV
                                    </Text>
                                    <TextInput
                                        style={[
                                            styles.input,
                                            focus6 ? styles.inputFocus : null,
                                            focus6 ? styles.boxShadow : null
                                        ]}
                                        onFocus={() => setFocus6(true)}
                                        onBlur={() => setFocus6(false)}
                                        type="text"
                                        class="form-control"
                                        id="cc-cvv"
                                        placeholder="000"
                                        required=""
                                        keyboardType="number-pad"
                                        maxLength={3}
                                    />
                                </View>
                            </View>
                        </View>

                        <View
                            class="my-3"
                            style={{
                                marginVertical: 16,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}
                        >
                            <Text style={{ fontSize: 24 }}>Total Cost:</Text>
                            <Text style={{ fontSize: 24 }}>23$</Text>
                        </View>

                        <View
                            class="my-4"
                            style={{
                                borderColor: "black",
                                borderBottomWidth: 1,
                                marginVertical: 20,
                                opacity: 0.2
                            }}
                        />
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
                </View>
            </ScrollView>
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
