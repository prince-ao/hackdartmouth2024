import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  ImageBackground,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios, { AxiosError } from "axios";

const backgroundImage = require("../../assets/images/background-2.jpg"); // Ensure this path is correct

export default function SignUp() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post("http://172.27.164.160:5000/signup", {
        email: form.email,
        username: form.username,
        password: form.password,
      });
      console.log(data);
      Alert.alert("Success", "Your account has been created!");
    } catch (error: any) {
      console.log(error.message);
      Alert.alert("Error", "Failed to create account");
    } finally {
      setForm({
        username: "",
        email: "",
        password: "",
      });
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.flexContainer}>
        <KeyboardAwareScrollView style={styles.scrollView}>
          <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
              <Image
                alt="App Logo"
                resizeMode="contain"
                style={styles.headerImg}
                source={require("../../assets/images/app_icon.png")} // Make sure this path is correct
              />

              <Text style={styles.title}>
                Sign up for <Text style={{ color: "#3C8690" }}>TimeFrame</Text>
              </Text>

              <Text style={styles.subtitle}>Create your account</Text>
            </View>

            {/* Form Section */}
            <View style={styles.form}>
              {/* Email Input */}
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Username</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  onChangeText={(username) => setForm({ ...form, username })}
                  placeholderTextColor="#6b7280"
                  placeholder="username..."
                  style={styles.inputControl}
                  value={form.username}
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              {/* Password Input */}
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  autoCorrect={false}
                  onChangeText={(email) => setForm({ ...form, email })}
                  placeholderTextColor="#6b7280"
                  placeholder="john@example.com"
                  style={styles.inputControl}
                  value={form.email}
                />
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              {/* Confirm Password Input */}
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  autoCorrect={false}
                  onChangeText={(password) => setForm({ ...form, password })}
                  placeholder="********"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  secureTextEntry={true}
                  value={form.password}
                />
                {errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>

              {/* Sign Up Button */}
              <View style={styles.formAction}>
                {isLoading ? (
                  <ActivityIndicator size="large" color="#075eec" />
                ) : (
                  <TouchableOpacity
                    onPress={() => router.replace("/home/") /*handleSignUp*/}
                  >
                    <View style={styles.btn}>
                      <Text style={styles.btnText}>Sign Up</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    objectFit: "cover",
  },
  flexContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 31,
    fontWeight: "700",
    color: "#2C3E50", // changed to the suggested navy blue
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#50372D", // changed to the suggested dark brown
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 36,
  },
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: "#fff", // changed to the suggested light tan
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 1,
    borderColor: "#59788E", // changed to the suggested lighter navy blue
    borderStyle: "solid",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 4,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#3C8690",
    borderColor: "#2A5E6B",
  },
  btnText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  // ... (You may have additional styles which should also be here)
});
