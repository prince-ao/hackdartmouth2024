import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Animated from "react-native-reanimated";

const windowWidth = Dimensions.get("window").width;
const columnWidth = windowWidth / 3;

export default function Screen() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const key = await AsyncStorage.getItem("my-key");

      const response = await fetch("http://timeframe.study/home", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth: key!,
        },
      });

      const response_data = await response.json();
      setData(response_data);
    })();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text>Previous Frames</Text>
      {data.length > 0 &&
        data.map((item, index) => (
          <View key={index} style={{ padding: 10 }}>
            <TouchableOpacity
              onPress={() =>
                router.navigate(
                  `/home/Details?image=${item.image}&description=${item.description}&title=${item.title}&index=${index}`
                )
              }
            >
              <Animated.Image
                sharedTransitionTag={`image-${index}`}
                style={{ width: 100, height: 100 }}
                source={{ uri: `data:image/jpeg;base64,${item.image}` }}
              />
              <Text>{item.title}</Text>
            </TouchableOpacity>
          </View>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: windowWidth,
  },
  item: {
    width: columnWidth - 20,
    padding: 10,
    margin: 5,
    backgroundColor: "#ccc",
  },
});
