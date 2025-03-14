import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { supabase } from "@/lib/superbase";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  return (
    <SafeAreaView>
      <ThemedView style={{ gap: 10 }}>
        <ThemedText>Profile</ThemedText>

        <Button onPress={async () => await supabase.auth.signOut()}>
          Sign Out
        </Button>
      </ThemedView>
    </SafeAreaView>
  );
}
