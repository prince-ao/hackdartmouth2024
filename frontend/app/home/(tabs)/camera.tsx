import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  Button,
  ActivityIndicator,
  Pressable
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";

export default function CameraCP() {
  const [hasPermission, setHasPermission] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const cameraRef = useRef<Camera>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  async function fetchUserLocation() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Location permission not granted");
        return null;
      }

      const location = await Location.getCurrentPositionAsync({});
      return location;
    } catch (error) {
      console.error("Error getting location", error);
      return null;
    }
  }

  useEffect(() => {
    let intervalId: any;
    if (countdown !== null && countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      takePictureAndSend();
    }

    return () => clearInterval(intervalId);
  }, [countdown]);

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
      setLoading(true);
      const currentLocation = await fetchUserLocation();

      console.log(JSON.stringify(currentLocation));

      const response = await fetch("http://34.125.69.153/gen-ar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: base64Image,
          location: JSON.stringify(currentLocation),
        }),
      });

      const responseData = await response.text();

      console.log(responseData);
      setLoading(false);

      setResponseText(responseData);
      setModalVisible(true);
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
      {loading && (
        <ActivityIndicator size="large" color="#00ff00" /> // Customize size and color as needed
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{responseText}</Text>
            <Button
              title="Close"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>
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
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.7)",
    borderStyle: "dashed",
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
