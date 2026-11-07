import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "@/constants/colors";

interface TourStopScreenContentProps {
  onExit: () => void;
}

const libraryNotes = [
  {
    title: "Library",
    category: "Study & focus",
    description: "Your space to focus, find a good read or work on your next big idea with classmates.",
    tip: "Try a window seat when you need a little extra focus.",
  },
  {
    title: "Find your study spot",
    category: "Study spaces",
    description: "Choose a quiet corner for solo work or a shared table for your next group project.",
    tip: "Look for a spot near the windows for natural light throughout the day.",
  },
];

export function TourStopScreenContent({ onExit }: TourStopScreenContentProps) {
  const [step, setStep] = useState(0);
  const note = libraryNotes[step];
  const stopNumber = step + 3;

  const goBack = () => {
    if (step > 0) {
      setStep(step - 1);
      return;
    }

    onExit();
  };

  const goNext = () => {
    if (step < libraryNotes.length - 1) {
      setStep(step + 1);
      return;
    }

    onExit();
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>UCLL VIRTUAL TOUR</Text>
          <Text style={styles.title}>Campus tour</Text>
        </View>
        <View style={styles.mapIcon}>
          <Ionicons name="map-outline" size={22} color={COLORS.text} />
        </View>
      </View>

      <Image
        source={require("../../../public/images/library.png")}
        style={styles.heroImage}
        resizeMode="cover"
        accessibilityLabel="A bright campus library with tables, bookshelves and windows"
      />

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text style={styles.stopTitle}>{note.title}</Text>
          <View style={styles.category}>
            <Ionicons name="book-outline" size={14} color={COLORS.primary} />
            <Text style={styles.categoryText}>{note.category}</Text>
          </View>
        </View>
        <Text style={styles.description}>{note.description}</Text>

        <View style={styles.tipCard}>
          <View style={styles.tipIcon}>
            <Ionicons name="bulb-outline" size={21} color={COLORS.primary} />
          </View>
          <View style={styles.tipCopy}>
            <Text style={styles.tipTitle}>Tip from a student</Text>
            <Text style={styles.tipText}>“{note.tip}”</Text>
          </View>
        </View>

        <View style={styles.progressHeading}>
          <Text style={styles.progressTitle}>Stop {stopNumber} of 10</Text>
          <Text style={styles.progressPercent}>{stopNumber * 10}%</Text>
        </View>
        <View
          style={styles.progressTrack}
          accessibilityRole="progressbar"
          accessibilityValue={{ min: 0, max: 10, now: stopNumber }}
        >
          <View style={[styles.progressFill, { width: `${stopNumber * 10}%` }]} />
        </View>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            testID="tour-back-button"
            onPress={goBack}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            testID={step < libraryNotes.length - 1 ? "tour-next-button" : "tour-finish-button"}
            onPress={goNext}
            style={({ pressed }) => [styles.nextButton, pressed && styles.pressed]}
          >
            <Text style={styles.nextButtonText}>
              {step < libraryNotes.length - 1 ? "Next" : "Finish"}
            </Text>
            <Ionicons name="arrow-forward" size={17} color={COLORS.white} />
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: COLORS.white },
  content: { paddingBottom: 24 },
  header: {
    minHeight: 82,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  eyebrow: { color: COLORS.primary, fontSize: 10, fontWeight: "700", letterSpacing: 0.5 },
  title: { color: COLORS.text, fontSize: 25, lineHeight: 30, fontWeight: "700", marginTop: 3 },
  mapIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4F4F6",
  },
  heroImage: { width: "100%", aspectRatio: 422 / 284 },
  body: { paddingHorizontal: 20, paddingTop: 19 },
  titleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  stopTitle: { color: COLORS.text, fontSize: 31, lineHeight: 38, fontWeight: "700" },
  category: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 14,
    backgroundColor: "#FFF0F4",
  },
  categoryText: { color: COLORS.primary, fontSize: 11, fontWeight: "600", marginLeft: 5 },
  description: { color: "#686873", fontSize: 14, lineHeight: 22, marginTop: 13 },
  tipCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 14,
    marginTop: 18,
    borderRadius: 17,
    backgroundColor: "#F5F5F7",
  },
  tipIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    marginRight: 12,
  },
  tipCopy: { flex: 1 },
  tipTitle: { color: COLORS.text, fontSize: 13, fontWeight: "700" },
  tipText: { color: "#686873", fontSize: 12, lineHeight: 18, marginTop: 4 },
  progressHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 23,
    marginBottom: 9,
  },
  progressTitle: { color: COLORS.text, fontSize: 12, fontWeight: "600" },
  progressPercent: { color: COLORS.grey, fontSize: 12 },
  progressTrack: { height: 6, overflow: "hidden", borderRadius: 4, backgroundColor: "#E8E8EC" },
  progressFill: { height: "100%", borderRadius: 4, backgroundColor: COLORS.primary },
  actions: { flexDirection: "row", gap: 12, marginTop: 22 },
  backButton: {
    flex: 1,
    minHeight: 50,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: { color: COLORS.text, fontSize: 14, fontWeight: "600" },
  nextButton: {
    flex: 1,
    minHeight: 50,
    borderRadius: 13,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  nextButtonText: { color: COLORS.white, fontSize: 14, fontWeight: "700" },
  pressed: { opacity: 0.8 },
});
