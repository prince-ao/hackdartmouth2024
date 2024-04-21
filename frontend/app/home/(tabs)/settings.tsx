import {
  Pressable,
  StyleSheet,
  Alert,
  Modal,
  Text,
  View,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function TabTwoScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const removeKeyAndNavigate = async () => {
    try {
      await AsyncStorage.removeItem("my-key");
      Alert.alert("Success", "Logged out successfully 🎉");
      router.push("/");
    } catch (e) {
      throw new Error("Failed to remove key");
    }
  };
  // const getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('my-key');
  //     if (value !== null) {
  //       console.log(value);
  //     }
  //   } catch (e) {
  //     throw new Error("Failed to get data");
  //   }
  // }
  // getData();
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={{ borderRadius: 50, height: 50, width: 50 }}
          source={{
            uri: "https://media.licdn.com/dms/image/D4E03AQETYleC1x2nbA/profile-displayphoto-shrink_400_400/0/1698117022607?e=1719446400&v=beta&t=hPA1732eMiCTVlW3XTfth9e6pq8UnhgXmEoDgB0q2wc",
          }}
        />
      </View>
      <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={{ color: "white" }}>Logout</Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want to logout?
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                removeKeyAndNavigate();
              }}
            >
              <Text style={styles.textStyle}>Yes, Logout</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>No, Go Back</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#FF0000",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginTop: 10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});
