import React, { useState } from "react";
import { Link } from "expo-router";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import Animated, {
  FadeInLeft,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  withSequence,
} from "react-native-reanimated";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ImageBackground } from "react-native";
export default function Example() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const backgroundImage = require("../../assets/images/background-2.jpg");

  const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);


  const validateForm = () => {
    let valid = true;
    let newErrors: any = {};

    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (!form.password) {
      newErrors.password = "Password cannot be empty";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignIn = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        // Perform sign-in logic, possibly using an API call
        // Example: await signInApi(form.email, form.password);

        Alert.alert("Success", "You are logged in!");
      } catch (error) {
        Alert.alert("Error", "Failed to sign in");
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
        <KeyboardAwareScrollView style={{} /*styles.scrollView*/}>
          <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
              <Image
                alt="App Logo"
                resizeMode="contain"
                style={styles.headerImg}
                source={require("../../assets/images/app_icon.png")}
              />

              <Text style={styles.title}>
                Sign in to <Text style={{ color: "#3C8690" }}>TimeFrame</Text>
              </Text>

              <Text style={styles.subtitle}>
                Get access to your portfolio and more
              </Text>
            </View>

            {/* Form Section */}
            <View style={styles.form}>
              {/* Email Input */}
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Email address</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  onChangeText={(email) => setForm({ ...form, email })}
                  placeholder="john@example.com"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={form.email}
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              {/* Password Input */}
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
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              {/* Sign In Button */}
              <View style={styles.formAction}>
                {isLoading ? (
                  <ActivityIndicator size="large" color="#075eec" />
                ) : (
                  <TouchableOpacity onPress={handleSignIn}>
                    <View style={styles.btn}>
                      <Text style={styles.btnText}>Sign in</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>

              {/* Forgot Password Link */}
              <Text style={styles.formLink}>Forgot password?</Text>
            </View>
            <Link href="/signup/" asChild replace>
            <AnimatedTouchableOpacity
              entering={FadeInLeft.duration(500).delay(600)}
              style={styles.button}
              onPress={() => console.log("Button Pressed")}
            >
              <Text style={styles.formFooter}>Dont have an account? Sign Up here.</Text>
            </AnimatedTouchableOpacity>
          </Link>
          </View>
        </KeyboardAwareScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "110%",
    objectFit: "cover",
  },
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 31,
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#50372D",
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
    marginBottom: 32,
  },
  formLink: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3C8690",
    textAlign: "center",
  },
  formFooter: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    letterSpacing: 0.15,
    marginTop: 20,
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
  buttonText: {

  },
  inputControl: {
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 1,
    borderColor: "#C9D3DB",
    borderStyle: "solid",
  },
  button: {
    
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
    borderWidth: 1,
    backgroundColor: "#3C8690",
    borderColor: "#2A5E6B",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
});
