import { Screen } from "../../../src/components/primitives/Screen";
import { Stack } from "../../../src/components/primitives/Stack";
import { Text } from "../../../src/components/primitives/Text";

export default function ProfileScreen() {
  return (
    <Screen padding="lg">
      <Stack gap="md">
        <Text>This would be the profile page.</Text>
      </Stack>
    </Screen>
  );
}
