import { StyleSheet, View } from "react-native";
import { Text } from "../primitives/Text";

export function TourScreenContent() {
  return (
    <View style={styles.container}>
      <Text>Tour</Text>
      <Text>Component.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
