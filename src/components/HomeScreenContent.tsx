import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { COLORS } from "@/constants/colors";
import { TourStopScreenContent } from "@/components/map/TourStopScreenContent";

export function HomeScreenContent() {
  const { tourStop } = useLocalSearchParams<{ tourStop?: string }>();

  if (tourStop === "library") {
    return <TourStopScreenContent onExit={() => router.replace("/")} />;
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.brand}>
          <Text style={styles.brandName}>UCLL</Text>
          <Text style={styles.brandDescription}>VIRTUAL{"\n"}TOUR</Text>
        </View>
        <View style={styles.languagePicker} accessibilityLabel="Language: English">
          <Text style={styles.languageInactive}>NL</Text>
          <Text style={styles.languageActive}>EN</Text>
        </View>
      </View>

      <Image
        source={require("../../public/images/campus-welcome.png")}
        style={styles.heroImage}
        resizeMode="cover"
        accessibilityLabel="Students walking through the UCLL campus"
      />

      <View style={styles.intro}>
        <Text style={styles.eyebrow}>MEET YOUR CAMPUS</Text>
        <Text style={styles.title}>Welcome to UCLL</Text>
        <Text style={styles.description}>
          Find your favourite spots, get student tips and feel at home before day one.
        </Text>
      </View>

      <Link
        href={{ pathname: "/", params: { tourStop: "library" } }}
        accessibilityRole="button"
        testID="start-tour-button"
        style={styles.primaryButton}
      >
        <Text style={styles.primaryButtonText}>Start the tour</Text>
        <Text style={styles.primaryArrow}>→</Text>
      </Link>

      <Link
        href="/map"
        accessibilityRole="link"
        testID="explore-freely-link"
        style={styles.secondaryButton}
      >
        <Text style={styles.secondaryButtonText}>Explore freely</Text>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: COLORS.white },
  content: {
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
  },
  header: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  brand: { flexDirection: "row", alignItems: "center" },
  brandName: { color: COLORS.primary, fontSize: 28, lineHeight: 34, fontWeight: "900" },
  brandDescription: {
    color: COLORS.text,
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "700",
    marginLeft: 10,
  },
  languagePicker: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    borderRadius: 16,
    backgroundColor: "#F4F4F6",
  },
  languageInactive: { color: COLORS.grey, fontSize: 12, paddingHorizontal: 9, paddingVertical: 7 },
  languageActive: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "700",
    paddingHorizontal: 9,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: COLORS.white,
  },
  heroImage: { width: "100%", aspectRatio: 371 / 322, borderRadius: 18 },
  intro: { marginTop: 24, marginBottom: 24 },
  eyebrow: { color: COLORS.primary, fontSize: 11, fontWeight: "700", letterSpacing: 0.5 },
  title: { color: COLORS.text, fontSize: 32, lineHeight: 38, fontWeight: "700", marginTop: 10 },
  description: { color: "#686873", fontSize: 15, lineHeight: 23, marginTop: 10 },
  primaryButton: {
    minHeight: 54,
    borderRadius: 13,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: { color: COLORS.white, fontSize: 15, fontWeight: "700" },
  primaryArrow: { color: COLORS.white, fontSize: 22, marginLeft: 10, lineHeight: 25 },
  secondaryButton: { alignSelf: "center", paddingHorizontal: 20, paddingVertical: 16 },
  secondaryButtonText: { color: COLORS.primary, fontSize: 14, fontWeight: "700" },
});
