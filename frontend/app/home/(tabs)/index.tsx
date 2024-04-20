import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { Camera } from "expo-camera";

export default function CameraCP() {
  const [hasPermission, setHasPermission] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    let intervalId = null;
    if (countdown > 0 && hasPermission) {
      intervalId = setInterval(() => {
        setCountdown((c) => c - 1);
      }, 1000);
    } else {
      clearInterval(intervalId!);
    }
    return () => clearInterval(intervalId!);
  }, [countdown, hasPermission]);

  const handleLongPress = () => {
    setCountdown(3);
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  let camera: Camera;

  return (
    <Camera
      style={styles.camera}
      ref={(ref) => {
        camera = ref!;
      }}
    >
      <View style={styles.counterContainer}>
        <Text style={styles.countdownText}>
          {countdown > 0 ? countdown : ""}
        </Text>
        <TouchableOpacity
          style={styles.dashedSquare}
          onLongPress={handleLongPress}
          onPressOut={() => setCountdown(0)}
        />
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  counterContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  countdownText: {
    fontSize: 64,
    color: "white",
    fontWeight: "bold",
  },
  dashedSquare: {
    marginBottom: 50,
    width: 150,
    height: 170,
    borderWidth: 6,
    borderColor: "#5D837A",
    borderStyle: "dashed",
    borderRadius: 10,
    backgroundColor: "rgba(203, 106, 58, 0.2)",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
