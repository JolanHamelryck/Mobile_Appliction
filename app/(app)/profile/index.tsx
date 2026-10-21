import { Screen } from "../../../src/components/primitives/Screen";
import { Stack } from "../../../src/components/primitives/Stack";
import { ProfileScreenContent } from "@/components/profile/ProfileScreenContent";
export default function ProfileScreen() {
  return (
    <Screen padding="lg">
      <Stack gap="md">
        <ProfileScreenContent />
      </Stack>
    </Screen>
  );
}
