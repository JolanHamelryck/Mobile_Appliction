import { COLORS } from "@/constants/colors";
import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function NavigationBar() {
  return (
    <Tabs>
      <Tabs.Screen
        name="tour"
        options={{
          title: "Tour",
          tabBarIcon: ({ size, focused }) => (
            <Image
              source={require("../../public/icons/tourIcon.png")}
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
      <Tabs.Screen name="index" options={{ href: null }} />
    </Tabs>
  );
}
