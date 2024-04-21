import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { router } from "expo-router";
import { useLocalSearchParams, useGlobalSearchParams, Link } from "expo-router";
import Animated, { FadeInLeft } from "react-native-reanimated";

const Details = ({ route }: any) => {
  const glob = useGlobalSearchParams();
  return (
    <ScrollView>
      <Animated.Image
        sharedTransitionTag={`image-${glob.index}`}
        style={{ width: "100%", height: 300 }}
        source={{
          uri: `data:image/jpeg;base64,${glob.image}`,
        }}
      />
      <Animated.Text
        entering={FadeInLeft.duration(500).delay(300)}
        style={{ fontWeight: "bold", fontSize: 18, padding: 16 }}
      >
        {glob.title}
      </Animated.Text>

      <Animated.Text
        entering={FadeInLeft.duration(500).delay(600)}
        style={{ fontSize: 18, padding: 16 }}
      >
        {glob.description}
      </Animated.Text>
    </ScrollView>
  );
};

export default Details;
