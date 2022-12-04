import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Platform,
    Text,
    TouchableHighlight,
    TextInput
} from "react-native";
import Svg, { Path } from "react-native-svg";

export default function Menu() {
    const [open, setOpen] = useState(false);
    const [vehicle, setVehicle] = useState("car"); //walk or car

    return (
        <View
            style={{
                position: "absolute",
                top: 20,
                left: 20,
                padding: 10,
                backgroundColor: "#fff",
                width: open ? 200 : null,
                zIndex: 20,
                flex: 1,
                borderRadius: 5
            }}
        >
            {open ? (
                <React.Fragment>
                    <View
                        class="d-flex align-items-center gap-2 mb-3"
                        style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            alignItems: "center",
                            marginBottom: 15
                        }}
                    >
                        <View
                            style={{
                                marginRight: 10
                            }}
                        >
                            <TouchableHighlight
                                onPress={() => setVehicle("walk")}
                            >
                                <View
                                    style={{
                                        backgroundColor:
                                            vehicle == "walk"
                                                ? "#0d6efd"
                                                : "transparent",
                                        padding: 8,
                                        borderRadius: 9999,
                                        alignItems: "center"
                                    }}
                                >
                                    <Svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 320 512"
                                        width="20px"
                                        height="20px"
                                        fill={
                                            vehicle == "walk" ? "#fff" : "#000"
                                        }
                                        style={{
                                            flex: 1
                                        }}
                                    >
                                        <Path d="M256 48c0 26.5-21.5 48-48 48s-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48zM126.5 199.3c-1 .4-1.9 .8-2.9 1.2l-8 3.5c-16.4 7.3-29 21.2-34.7 38.2l-2.6 7.8c-5.6 16.8-23.7 25.8-40.5 20.2s-25.8-23.7-20.2-40.5l2.6-7.8c11.4-34.1 36.6-61.9 69.4-76.5l8-3.5c20.8-9.2 43.3-14 66.1-14c44.6 0 84.8 26.8 101.9 67.9L281 232.7l21.4 10.7c15.8 7.9 22.2 27.1 14.3 42.9s-27.1 22.2-42.9 14.3L247 287.3c-10.3-5.2-18.4-13.8-22.8-24.5l-9.6-23-19.3 65.5 49.5 54c5.4 5.9 9.2 13 11.2 20.8l23 92.1c4.3 17.1-6.1 34.5-23.3 38.8s-34.5-6.1-38.8-23.3l-22-88.1-70.7-77.1c-14.8-16.1-20.3-38.6-14.7-59.7l16.9-63.5zM68.7 398l25-62.4c2.1 3 4.5 5.8 7 8.6l40.7 44.4-14.5 36.2c-2.4 6-6 11.5-10.6 16.1L54.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L68.7 398z" />
                                    </Svg>
                                </View>
                            </TouchableHighlight>
                        </View>
                        <TouchableHighlight onPress={() => setVehicle("car")}>
                            <View
                                style={{
                                    backgroundColor:
                                        vehicle == "car"
                                            ? "#0d6efd"
                                            : "transparent",
                                    padding: 8,
                                    borderRadius: 999999,
                                    alignItems: "center"
                                }}
                            >
                                <Svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20px"
                                    height="20px"
                                    viewBox="0 0 512 512"
                                    fill={vehicle == "car" ? "#fff" : "#000"}
                                    style={{ flex: 1 }}
                                >
                                    <Path d="M135.2 117.4L109.1 192H402.9l-26.1-74.6C372.3 104.6 360.2 96 346.6 96H165.4c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32H346.6c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2V400v48c0 17.7-14.3 32-32 32H448c-17.7 0-32-14.3-32-32V400H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V400 256c0-26.7 16.4-49.6 39.6-59.2zM128 288c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zm288 32c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32z" />
                                </Svg>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View
                        class="mb-1 d-flex align-items-center"
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 7
                        }}
                    >
                        <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20px"
                            height="20px"
                            viewBox="0 0 512 512"
                            style={{
                                marginRight: 10
                            }}
                            fill="gray"
                        >
                            <Path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
                        </Svg>
                        <TextInput
                            type="text"
                            class="form-control"
                            placeholder="from"
                            style={{
                                borderWidth: 1,
                                paddingVertical: 5,
                                paddingHorizontal: 5,
                                flex: 1,
                                borderRadius: 5
                            }}
                        />
                    </View>
                    <View
                        class="mb-3 d-flex align-items-center"
                        style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            alignItems: "center",
                            marginBottom: 15
                        }}
                    >
                        <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20px"
                            height="20px"
                            viewBox="0 0 384 512"
                            style={{
                                marginRight: 10
                            }}
                            fill="#EF4444"
                        >
                            <Path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z" />
                        </Svg>
                        <TextInput
                            type="text"
                            class="form-control"
                            placeholder="to"
                            style={{
                                borderWidth: 1,
                                paddingVertical: 5,
                                paddingHorizontal: 5,
                                flex: 1,
                                borderRadius: 5
                            }}
                        />
                    </View>
                    <TouchableHighlight onPress={() => alert("press")}>
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
                                    color: "white"
                                }}
                            >
                                Search
                            </Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => setOpen(false)}>
                        <View
                            style={{
                                backgroundColor: "#0d6efd",
                                padding: 10,
                                alignItems: "center",
                                marginTop: 10,
                                borderRadius: 5
                            }}
                        >
                            <Text
                                style={{
                                    color: "white"
                                }}
                            >
                                Close
                            </Text>
                        </View>
                    </TouchableHighlight>
                </React.Fragment>
            ) : (
                <TouchableHighlight onPress={() => setOpen(true)}>
                    <Svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        width={20}
                        height={20}
                    >
                        <Path
                            fill="black"
                            d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
                        />
                    </Svg>
                </TouchableHighlight>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    text: {
        position: "absolute",
        top: 100,
        backgroundColor: "red",
        zIndex: 10
    }
});
