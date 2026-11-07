import { useState } from "react";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { COLORS } from "@/constants/colors";
import { useAuthStore } from "@/state/useAuthStore";

export function ProfileScreenContent() {
  const user = useAuthStore((state) => state.user);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heading}>
        <View>
          <Text style={styles.eyebrow}>PROFILE</Text>
          <Text style={styles.title}>Your space</Text>
        </View>
        <View style={styles.settingsIcon}>
          <Ionicons name="options-outline" size={21} color={COLORS.text} />
        </View>
      </View>

      <View style={styles.greeting}>
        <View style={styles.avatar}>
          <Ionicons name="person-outline" size={25} color={COLORS.primary} />
        </View>
        <View style={styles.greetingCopy}>
          <Text style={styles.greetingTitle}>
            {user?.name ? `Hello, ${user.name}` : "Hello, explorer"}
          </Text>
          <Text style={styles.greetingDescription}>
            {user ? "Your campus journey is underway." : "You’re exploring in guest mode."}
          </Text>
        </View>
      </View>

      {!user && (
        <Link
          href="/login"
          accessibilityRole="button"
          testID="profile-login-button"
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>Log in with UCLL account</Text>
          <Ionicons name="arrow-up-outline" size={17} color={COLORS.white} />
        </Link>
      )}

      <View style={styles.storyCard}>
        <View style={styles.storyHeading}>
          <Text style={styles.storyTitle}>Your campus story</Text>
          <Ionicons name="git-branch-outline" size={20} color={COLORS.primary} />
        </View>
        <View style={styles.progressHeading}>
          <Text style={styles.progressTitle}>4 of 10 stops visited</Text>
          <Text style={styles.progressPercent}>40%</Text>
        </View>
        <View
          style={styles.progressTrack}
          accessibilityRole="progressbar"
          accessibilityValue={{ min: 0, max: 10, now: 4 }}
        >
          <View style={styles.progressFill} />
        </View>
        <View style={styles.milestones}>
          <View style={styles.milestone}>
            <View style={styles.milestoneIcon}>
              <Ionicons name="footsteps-outline" size={17} color={COLORS.primary} />
            </View>
            <Text style={styles.milestoneLabel}>First steps</Text>
          </View>
          <View style={styles.milestone}>
            <View style={styles.milestoneIcon}>
              <Ionicons name="compass-outline" size={17} color={COLORS.primary} />
            </View>
            <Text style={styles.milestoneLabel}>Explorer</Text>
          </View>
          <View style={styles.milestone}>
            <View style={[styles.milestoneIcon, styles.lockedIcon]}>
              <Ionicons name="flag-outline" size={17} color={COLORS.grey} />
            </View>
            <Text style={[styles.milestoneLabel, styles.lockedLabel]}>Finisher</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionLabel}>MAKE IT YOURS</Text>
      <View style={styles.settingsList}>
        <View style={styles.settingRow}>
          <Ionicons name="language-outline" size={20} color={COLORS.grey} />
          <Text style={styles.settingLabel}>Language</Text>
          <Text style={styles.settingValue}>English</Text>
          <Ionicons name="chevron-forward" size={17} color={COLORS.grey} />
        </View>
        <View style={styles.settingRow}>
          <Ionicons name="heart-outline" size={20} color={COLORS.grey} />
          <Text style={styles.settingLabel}>Favourite stops</Text>
          <Text style={styles.settingValue}>2</Text>
          <Ionicons name="chevron-forward" size={17} color={COLORS.grey} />
        </View>
        <View style={styles.settingRow}>
          <Ionicons name="moon-outline" size={20} color={COLORS.grey} />
          <Text style={styles.settingLabel}>Dark mode</Text>
          <Switch
            accessibilityLabel="Dark mode"
            testID="dark-mode-switch"
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: "#E0E0E5", true: COLORS.primary }}
            thumbColor={COLORS.white}
          />
        </View>
        <View style={[styles.settingRow, styles.lastSettingRow]}>
          <Ionicons name="help-circle-outline" size={20} color={COLORS.grey} />
          <Text style={styles.settingLabel}>Help</Text>
          <View style={styles.settingSpacer} />
          <Ionicons name="chevron-forward" size={17} color={COLORS.grey} />
        </View>
      </View>
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
  heading: {
    minHeight: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  eyebrow: { color: COLORS.primary, fontSize: 10, fontWeight: "700" },
  title: { color: COLORS.text, fontSize: 27, lineHeight: 32, fontWeight: "700", marginTop: 3 },
  settingsIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4F4F6",
  },
  greeting: { flexDirection: "row", alignItems: "center", marginTop: 8, marginBottom: 17 },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF0F4",
    marginRight: 14,
  },
  greetingCopy: { flex: 1 },
  greetingTitle: { color: COLORS.text, fontSize: 20, fontWeight: "700" },
  greetingDescription: { color: "#686873", fontSize: 12, marginTop: 5 },
  loginButton: {
    minHeight: 52,
    borderRadius: 13,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  loginButtonText: { color: COLORS.white, fontSize: 14, fontWeight: "700" },
  storyCard: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: "#F5F5F7",
    marginTop: 21,
    marginBottom: 25,
  },
  storyHeading: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  storyTitle: { color: COLORS.text, fontSize: 16, fontWeight: "700" },
  progressHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 9,
  },
  progressTitle: { color: COLORS.text, fontSize: 12, fontWeight: "600" },
  progressPercent: { color: COLORS.grey, fontSize: 12 },
  progressTrack: { height: 6, overflow: "hidden", borderRadius: 4, backgroundColor: "#E4E4E9" },
  progressFill: { width: "40%", height: "100%", borderRadius: 4, backgroundColor: COLORS.primary },
  milestones: { flexDirection: "row", justifyContent: "space-around", marginTop: 16 },
  milestone: { alignItems: "center" },
  milestoneIcon: {
    width: 36,
    height: 36,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF0F4",
    marginBottom: 6,
  },
  lockedIcon: { backgroundColor: "#E8E8EC" },
  milestoneLabel: { color: COLORS.text, fontSize: 10 },
  lockedLabel: { color: COLORS.grey },
  sectionLabel: { color: "#686873", fontSize: 10, fontWeight: "700", marginBottom: 11 },
  settingsList: {
    borderWidth: 1,
    borderColor: "#E8E8EC",
    borderRadius: 16,
    paddingHorizontal: 14,
  },
  settingRow: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F2",
    gap: 12,
  },
  lastSettingRow: { borderBottomWidth: 0 },
  settingLabel: { flex: 1, color: COLORS.text, fontSize: 14 },
  settingValue: { color: COLORS.grey, fontSize: 12 },
  settingSpacer: { flex: 1 },
});
