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
      /*setTimeout(() => {
        const responseData = `
              The coordinates provided (43.7019, -72.2827) point to Dartmouth College, which is located in Hanover, New Hampshire. The
        image you shared features Baker Memorial Library, an iconic building at Dartmouth College.

        Historical Context:
        Dartmouth College, founded in 1769, is one of the oldest and most prestigious institutions of higher education in the
        United States. It was established by Eleazar Wheelock, a Congregational minister from Connecticut, with the original
        purpose of educating Native Americans. However, it quickly transitioned to primarily educating the colonial settlers'
        children.

        The Baker Memorial Library, central in your photograph, was completed in 1928 and is named after George Fisher Baker, a
        financier who donated substantial funds for its construction. The building is designed in a Colonial Revival style,
        which was a popular architectural style in the United States during the early 20th century, characterized by its
        symmetrical design, accentuated front door, and classical details. The brick facade and the white-bordered windows are
        typical of this style.

        Baker Library is not only a functional space serving students and faculty; it also holds significant historical and
        cultural artifacts, including murals by José Clemente Orozco, a renowned Mexican muralist. His work in the library,
        titled "The Epic of American Civilization," is considered one of the most important pieces of art at Dartmouth.

        Today, Dartmouth is renowned for its commitment to providing a liberal arts education and for its unique blend of
        teaching, research, and cultural resources, like those found in Baker Library. The setting in picturesque New Hampshire
        adds to its historic charm and academic environment.
              `;

        console.log(responseData);
        setLoading(false);

        setResponseText(responseData);
        setModalVisible(true);
      }, 1e3 * 3);*/

      const response = await fetch("http://34.125.69.163/gen-ar", {
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
        {loading && <ActivityIndicator size="large" color="#00ff00" />}
        <Text style={styles.countdownText}>{countdown}</Text>
        <TouchableOpacity
          style={styles.dashedSquare}
          onLongPress={handleLongPress}
          onPressOut={handlePressOut}
        />
      </View>

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
