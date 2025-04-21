import { Slot, Stack } from "expo-router";
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme";
import { styles } from "../../styles/auth";
import Toast from "react-native-toast-message";
import { Colors } from "@/constants/Colors";

export const unstable_settings = {
  initialRouteName: "index",
};

export const generateRouteOptions = () => ({
  headerShown: false,
  title: "",
});

export default function AuthLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: Colors.primary }]}
      edges={["top", "left", "right"]}
    >
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        translucent
        backgroundColor="transparent"
      />

      <ImageBackground
        source={require("@/assets/images/clube-back.png")}
        style={styles.header}
        resizeMode="cover"
      >
        <Text style={styles.warning}>
          *Atenção, aplicativo de testes, sem validade.
        </Text>
      </ImageBackground>

      <View style={styles.content}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <Slot />
        </ScrollView>
      </View>
      <Toast />
    </SafeAreaView>
  );
}
