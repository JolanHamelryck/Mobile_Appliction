import { MapScreenContent } from "@/components/map/MapScreenContent";
import { Screen } from "../../../src/components/primitives/Screen";
import { Stack } from "../../../src/components/primitives/Stack";
import { Text } from "../../../src/components/primitives/Text";

export default function mapScreen() {
  return (
    <Screen padding="lg">
      <Stack gap="md">
        <MapScreenContent />
      </Stack>
    </Screen>
  );
}
