import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { useAuthStore } from "../state/useAuthStore";
import { COLORS } from "../constants/colors";
import { InputField } from "./primitives/InputField";
import { StyledButton } from "./StyledButton";

export function LoginScreenContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLoading } = useAuthStore();

  const handleLogin = async () => {
    setError("");
    try {
      await login(email, password);
      router.replace("/");
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "Login failed. Check your credentials.",
      );
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <View style={styles.form}>
        <View style={styles.brand}>
          <View style={styles.brandMark}>
            <Text style={styles.brandMarkText}>U</Text>
          </View>
          <Text style={styles.brandName}>UCLL CAMPUS CONNECT</Text>
        </View>

        <View style={styles.heading}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>
            Log in with your UCLL account to continue.
          </Text>
        </View>

        <View style={styles.card}>
          <InputField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            testID="email-input"
          />
          <InputField
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            testID="password-input"
            error={error !== "" ? error : undefined}
          />
          <StyledButton
            label="Log in"
            onPress={handleLogin}
            isLoading={isLoading}
            testID="login-button"
          />
        </View>


        <Text style={styles.note}>
          Your account gives you access to your campus profile.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 22,
    paddingVertical: 28,
  },
  form: { width: "100%", maxWidth: 440, alignSelf: "center" },
  brand: { flexDirection: "row", alignItems: "center", marginBottom: 34 },
  brandMark: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    marginRight: 10,
  },
  brandMarkText: { color: COLORS.white, fontSize: 22, fontWeight: "800" },
  brandName: {
    color: COLORS.grey,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  heading: { marginBottom: 22 },
  title: {
    color: COLORS.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "700",
  },
  subtitle: { color: COLORS.grey, fontSize: 14, lineHeight: 21, marginTop: 7 },
  card: {
    gap: 20,
    padding: 20,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: "#ECECF0",
  },
  note: {
    color: COLORS.grey,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 18,
  },
});
