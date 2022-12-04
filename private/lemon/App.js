import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Platform, Text, SafeAreaView } from "react-native";
import * as Location from "expo-location";
import Svg, { Path } from "react-native-svg";
import DirectionsMenu from "./components/DirectionsMenu";

export default function App() {
    const [errorMsg, setErrorMsg] = useState(null);
    const [region, setRegion] = useState(null);

    const [vehiclesPosition, setVehiclePositions] = useState([
        {
            latlng: {
                latitude: 38.759908,
                longitude: -9.261399
            },
            title: "moto",
            description: "moto bue fixe"
        }
    ]);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDeelta: 0.0922,
                longitudeDelta: 0.0421
            });
        })();
    }, []);

    if (errorMsg) {
        return (
            <View style={styles.container}>
                <Text>{errorMsg}</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <DirectionsMenu />

            <Text style={styles.text}>{JSON.stringify(region)}</Text>
            <MapView
                style={styles.map}
                zoomEnabled={true}
                region={region}
                minZoomLevel={8}
                showsUserLocation={true}
                loadingEnabled={true}
            >
                {vehiclesPosition.map((marker, i) => (
                    <Marker
                        onPress={(e) =>
                            alert(JSON.stringify(e.nativeEvent.position))
                        }
                        key={i}
                        coordinate={marker.latlng}
                        title={marker.title}
                        description={marker.description}
                    />
                ))}
            </MapView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
    },
    map: {
        width: "100%",
        height: "100%"
    },
    text: {
        position: "absolute",
        top: 100,
        backgroundColor: "red",
        zIndex: 10
    }
});
