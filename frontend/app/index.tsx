import { useEffect } from "react";
import { Link } from "expo-router";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
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
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const backgroundImage = require("./../assets/images/background-1.webp"); // Ensure this path is correct

const { width, height } = Dimensions.get("window"); // Screen dimensions

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const AnimatedImage = Animated.createAnimatedComponent(Image);

function generatePositions(count: any, maxX: any, maxY: any, minDist: any) {
  const positions = [];
  while (positions.length < count) {
    const newPosition = {
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    };

    let isFarEnough = true;
    for (let pos of positions) {
      const dist = Math.sqrt(
        Math.pow(pos.x - newPosition.x, 2) + Math.pow(pos.y - newPosition.y, 2)
      );
      if (dist < minDist) {
        isFarEnough = false;
        break;
      }
    }

    if (isFarEnough) {
      positions.push(newPosition);
    }
  }
  return positions;
}

export default function Index() {
  const maxRadius = 50;
  const imageSize = 100;
  const maxMovementX = width - imageSize;
  const maxMovementY = height / 2 - imageSize - maxRadius;

  const centerPoints = generatePositions(
    4,
    maxMovementX,
    maxMovementY,
    imageSize * 1.5
  );

  const animations = centerPoints.map((point) => ({
    translateX: useSharedValue(point.x),
    translateY: useSharedValue(point.y),
    angle: useSharedValue(0),
    // Adding unique durations and directions
    duration: 8000 + Math.random() * 4000, // between 8000 and 12000 milliseconds
    direction: Math.random() > 0.5 ? 1 : -1, // randomly choosing rotation direction
  }));

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("my-key");
      if (value !== null) {
        router.replace("/home/(tabs)/camera");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
    animations.forEach((anim) => {
      anim.angle.value = withRepeat(
        withTiming(2 * Math.PI * anim.direction, {
          duration: anim.duration,
          easing: Easing.linear,
        }),
        Infinity,
        false
      );
    });
  }, []);

  const animatedStyles = animations.map((anim) =>
    useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateX:
              anim.translateX.value + maxRadius * Math.cos(anim.angle.value),
          },
          {
            translateY:
              anim.translateY.value + maxRadius * Math.sin(anim.angle.value),
          },
        ],
      };
    })
  );

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <AnimatedImage
        style={[styles.image, animatedStyles[0]]}
        source={require("../assets/images/p-1.webp")}
      />
      <AnimatedImage
        style={[styles.image, animatedStyles[1]]}
        source={require("../assets/images/p-2.webp")}
      />
      <AnimatedImage
        style={[styles.image, animatedStyles[2]]}
        source={require("../assets/images/p-3.webp")}
      />
      <AnimatedImage
        style={[styles.image, animatedStyles[3]]}
        source={require("../assets/images/p-4.webp")}
      />
      <View style={styles.container}>
      <Image
                alt="App Logo"
                resizeMode="contain"
                style={styles.headerImg}
                source={require("./../assets/images/app_icon.png")}
              />
        <Text style={styles.title}>TimeFrame</Text>
        
        <View style={styles.buttonContainer}>
          <Link href="/login/" asChild replace>
            <AnimatedTouchableOpacity
              entering={FadeInLeft.duration(500).delay(400)}
              style={styles.button}
              onPress={() => console.log("Button Pressed")}
            >
              <Text style={styles.buttonText}>Log In</Text>
            </AnimatedTouchableOpacity>
          </Link>
          <Link href="/signup/" asChild replace>
            <AnimatedTouchableOpacity
              entering={FadeInLeft.duration(500).delay(600)}
              style={styles.button}
              onPress={() => console.log("Button Pressed")}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </AnimatedTouchableOpacity>
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 180,
    height: 130,
    position: "absolute",
    top: 0,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  backgroundImage: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "110%",
    objectFit: "cover",
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
  headerImg: {
    width: 80,
    height: 80,
    marginTop: 150,
    alignSelf: "center",

  },
  title: {
    fontSize: 24,
    marginBottom: 380,
    color: "#FFFF",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: -1, height: 0 },
    textShadowRadius: 10,
  },
});
