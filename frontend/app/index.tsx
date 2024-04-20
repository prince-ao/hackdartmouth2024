import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

export default function Page() {
  return (
    <ImageBackground
      source={require("../assets/images/background-1.webp")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Snapchat</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("Button Pressed")}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("Button Pressed")}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  background: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },

  buttonContainer: {
    marginBottom: 50,
    gap: 15,
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    padding: 16,
    backgroundColor: "#3C8690",
    borderRadius: 30,
  },
  title: {
    fontSize: 24,
    marginTop: 80,
  },
});
