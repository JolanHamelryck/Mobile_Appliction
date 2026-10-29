import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "@/constants/colors";
import { useAuthStore } from "@/state/useAuthStore";

const tourHighlights = [
  { number: "01", title: "Discover the map", detail: "See what is around you." },
  { number: "02", title: "Find your next stop", detail: "Explore places at your own pace." },
  { number: "03", title: "Make it your own", detail: "Set up your profile when you are ready." },
];

export function HomeScreenContent() {
  const user = useAuthStore((state) => state.user);

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.brandMark}>
          <View style={styles.brandDot} />
        </View>
        <View style={styles.welcomeCopy}>
          <View style={styles.eyebrow}>
            <View style={styles.eyebrowDot} />
            <View>
              <Text style={styles.eyebrowText}>YOUR CAMPUS COMPANION</Text>
            </View>
          </View>
          <Text style={styles.title}>
            {user?.name ? `Welcome, ${user.name}.` : "Welcome."}
          </Text>
          <Text style={styles.description}>
            Find your way around and discover what campus has to offer.
          </Text>
        </View>
      </View>

      <View style={styles.hero}>
        <View style={styles.heroOrbLarge} />
        <View style={styles.heroOrbSmall} />
        <View style={styles.heroContent}>
          <Text style={styles.heroEyebrow}>A GOOD PLACE TO START</Text>
          <Text style={styles.heroTitle}>Your next stop is closer than you think.</Text>
          <Text style={styles.heroDescription}>
            Find places around campus and discover what is nearby.
          </Text>
          <Link href="/map" asChild>
            <Pressable
              accessibilityRole="button"
              style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}
            >
              <Text style={styles.primaryButtonText}>Explore the campus map</Text>
              <Text style={styles.buttonArrow}>→</Text>
            </Pressable>
          </Link>
          <Text style={styles.duration}>EXPLORE AT YOUR OWN PACE</Text>
        </View>
      </View>

      <View style={styles.sectionHeading}>
        <View>
          <Text style={styles.sectionEyebrow}>YOUR FIRST STEPS</Text>
          <Text style={styles.sectionTitle}>Here is what you can do</Text>
        </View>
        <View style={styles.stepCount}>
          <Text style={styles.stepCountText}>3 STEPS</Text>
        </View>
      </View>

      <View style={styles.highlights}>
        {tourHighlights.map((item) => (
          <View key={item.number} style={styles.highlight}>
            <View style={styles.numberBadge}>
              <Text style={styles.numberText}>{item.number}</Text>
            </View>
            <View style={styles.highlightCopy}>
              <Text style={styles.highlightTitle}>{item.title}</Text>
              <Text style={styles.highlightDetail}>{item.detail}</Text>
            </View>
            <Text style={styles.highlightArrow}>›</Text>
          </View>
        ))}
      </View>

      <Link href="/map" asChild>
        <Pressable
          accessibilityRole="link"
          style={({ pressed }) => [styles.mapLink, pressed && styles.buttonPressed]}
        >
          <Text style={styles.mapLinkText}>Or head straight to the map</Text>
          <Text style={styles.mapLinkArrow}>→</Text>
        </Pressable>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: 24, paddingTop: 28, paddingBottom: 36 },
  header: { flexDirection: "row", alignItems: "flex-start", marginBottom: 28 },
  brandMark: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  brandDot: { width: 13, height: 13, borderRadius: 7, backgroundColor: COLORS.white },
  welcomeCopy: { flex: 1, paddingTop: 1 },
  eyebrow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  eyebrowDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.primary, marginRight: 7 },
  eyebrowText: { fontSize: 10, fontWeight: "700", letterSpacing: 1.1, color: COLORS.grey },
  title: { color: COLORS.text, fontSize: 27, lineHeight: 34, fontWeight: "700" },
  description: { color: COLORS.grey, fontSize: 14, lineHeight: 21, marginTop: 5 },
  hero: {
    overflow: "hidden",
    borderRadius: 24,
    backgroundColor: "#25223A",
    marginBottom: 30,
  },
  heroOrbLarge: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    right: -82,
    top: -95,
    backgroundColor: "#39334F",
  },
  heroOrbSmall: {
    position: "absolute",
    width: 105,
    height: 105,
    borderRadius: 53,
    right: 28,
    top: 42,
    backgroundColor: "#302B45",
  },
  heroContent: { padding: 24, paddingTop: 28 },
  heroEyebrow: { color: "#F3A9BF", fontSize: 10, fontWeight: "700", letterSpacing: 1.2 },
  heroTitle: {
    color: COLORS.white,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "700",
    maxWidth: 300,
    marginTop: 12,
  },
  heroDescription: {
    color: "#D2D0DC",
    fontSize: 14,
    lineHeight: 21,
    maxWidth: 310,
    marginTop: 10,
    marginBottom: 22,
  },
  primaryButton: {
    minHeight: 50,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 17,
  },
  primaryButtonText: { color: COLORS.white, fontSize: 15, fontWeight: "700" },
  buttonArrow: { color: COLORS.white, fontSize: 22, lineHeight: 24 },
  buttonPressed: { opacity: 0.8 },
  duration: {
    color: "#C2BFCE",
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 0.8,
    marginTop: 15,
    textAlign: "center",
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  sectionEyebrow: { color: COLORS.grey, fontSize: 10, fontWeight: "700", letterSpacing: 1 },
  sectionTitle: { color: COLORS.text, fontSize: 19, lineHeight: 25, fontWeight: "700", marginTop: 4 },
  stepCount: {
    borderRadius: 20,
    backgroundColor: "#FCE8EE",
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 2,
  },
  stepCountText: { color: COLORS.primary, fontSize: 9, fontWeight: "700", letterSpacing: 0.5 },
  highlights: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    paddingHorizontal: 16,
  },
  highlight: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 76,
    borderBottomWidth: 1,
    borderBottomColor: "#F0EFF2",
  },
  numberBadge: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: "#FCE8EE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },
  numberText: { color: COLORS.primary, fontSize: 12, fontWeight: "700" },
  highlightCopy: { flex: 1 },
  highlightTitle: { color: COLORS.text, fontSize: 14, fontWeight: "700" },
  highlightDetail: { color: COLORS.grey, fontSize: 12, marginTop: 4 },
  highlightArrow: { color: "#B8B6BF", fontSize: 23, marginLeft: 8 },
  mapLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingVertical: 18,
  },
  mapLinkText: { color: COLORS.primary, fontSize: 13, fontWeight: "600" },
  mapLinkArrow: { color: COLORS.primary, fontSize: 18, marginLeft: 8 },
});
