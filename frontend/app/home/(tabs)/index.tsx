import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { Camera } from "expo-camera";

export default function CameraCP() {
  const [hasPermission, setHasPermission] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    let intervalId: any;
    if (countdown !== null && countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      takePictureAndSend();
    }

    return () => clearInterval(intervalId); // Cleanup interval on component unmount or countdown change
  }, [countdown]);

  /*useEffect(() => {
    let intervalId = null;
    if (countdown > 0 && hasPermission) {
      intervalId = setInterval(() => {
        setCountdown((c) => c - 1);
      }, 1000);
    } else {
      takePictureAndSend();
      clearInterval(intervalId!);
    }
    return () => {
      return clearInterval(intervalId!);
    };
  }, [countdown, hasPermission]);*/

  const handleLongPress = () => {
    if (countdown === null) {
      setCountdown(3);
    }
  };

  const handlePressOut = () => {
    setCountdown(null);
  };

  const takePictureAndSend = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.5,
          base64: true,
        });
        console.log("here");
        sendImageToBackend(photo.base64);
      } catch (error) {
        console.error("Error taking picture:", error);
        Alert.alert("Error", "Failed to take picture.");
      }
    }
  };

  const sendImageToBackend = async (base64Image: any) => {
    try {
      /*const response = await fetch("http://34.125.69.153/gen-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: base64Image,
        }),
      });
      const responseData = await response.json();*/
      console.log(base64Image);

      Alert.alert("Upload Success", "Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Upload Error", "Failed to upload image.");
    }
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <Camera style={styles.camera} ref={cameraRef}>
      <View style={styles.counterContainer}>
        <Text style={styles.countdownText}>{countdown}</Text>
        <TouchableOpacity
          style={styles.dashedSquare}
          onLongPress={handleLongPress}
          onPressOut={handlePressOut}
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
    marginBottom: 20,
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
