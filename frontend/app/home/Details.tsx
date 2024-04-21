import { View, Text } from "react-native";
import React from "react";
import { router } from "expo-router";

const Details = ({ route }: any) => {
  const { item } = route.params;
  console.log(item);
  return (
    <View>
      <Text>Details</Text>
    </View>
  );
};

export default Details;
