import { useAuthStore } from "../../src/state/useAuthStore";
import { Screen } from "../../src/components/primitives/Screen";
import { Stack } from "../../src/components/primitives/Stack";
import { Text } from "../../src/components/primitives/Text";
import { EmptyState } from "../../src/components/primitives/EmptyState";
import { StyledButton } from "../../src/components/StyledButton";
import { Badge } from "@/components/primitives";
import { TourScreenContent } from "@/components/tour/TourScreenContent";

export default function HomeScreen() {
  const { user, logout } = useAuthStore();

  return (
    <Screen padding="lg">
      <Stack gap="lg">
        <Text size="xl" weight="bold">
          {user !== null ? `Welcome, ${user.name}` : "Welcome"}
        </Text>
        <TourScreenContent />
        <Badge label={"Succes badge"} variant={"success"} />
        <EmptyState
          title="No items yet"
          description="Implement getItems() in your itemService to load data."
        />
        <StyledButton label="Log out" onPress={logout} variant="secondary" />
      </Stack>
    </Screen>
  );
}
