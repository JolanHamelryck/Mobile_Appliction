import { COLORS } from "@/constants/colors";
import { Tabs } from "expo-router";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function NavigationBar() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name="home"
              size={size}
              color={focused ? COLORS.primary : COLORS.grey}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ size, focused }) => (
            <Image
              source={require("../../public/icons/mapIcon.png")}
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: 2,
                borderColor: focused ? COLORS.primary : "transparent",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ size, focused }) => (
            <Image
              source={require("../../public/icons/account.png")}
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: 2,
                borderColor: focused ? COLORS.primary : "transparent",
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
