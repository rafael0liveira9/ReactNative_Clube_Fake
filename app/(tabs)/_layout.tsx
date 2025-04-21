import { Slot, Tabs } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  Text,
  ImageBackground,
  StatusBar,
  View,
  Pressable,
  Modal,
  Button,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { styles } from "../../styles/tabs";
import Toast from "react-native-toast-message";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import * as SecureStore from "expo-secure-store";
import { router, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export const unstable_settings = {
  initialRouteName: "index",
};

export const generateRouteOptions = () => ({
  headerShown: false,
  title: "",
});

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const path = usePathname();
  const [warningVisible, setWarningVisible] = useState<boolean>(false);

  async function Logout() {
    try {
      const keysToDelete = ["userToken", "userName", "userType", "userId"];
      await Promise.all(
        keysToDelete.map((key) => SecureStore.deleteItemAsync(key))
      );
      console.log("SecureStore limpo!");
      router.replace("/(auth)");
    } catch (error) {
      console.error("Erro ao limpar SecureStore:", error);
    }
  }

  function LogoutModal() {
    return (
      <Modal
        visible={warningVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setWarningVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              width: 300,
              padding: 20,
              backgroundColor: "white",
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ paddingVertical: 20 }}>Deseja sair da conta?</Text>
            <View
              style={{
                display: "flex",
                gap: 20,
                flexDirection: "row",
                paddingBottom: 30,
              }}
            >
              <Button color={Colors.default} title="❌ SAIR" onPress={Logout} />
              <Button
                color={Colors.check}
                title="✅ FICAR"
                onPress={() => setWarningVisible(false)}
              />
            </View>
            <Text
              style={styles.logoutInfoLinkText}
              onPress={() => {
                Linking.openURL(
                  "https://api.whatsapp.com/send?phone=5541992730204&text=Quero%20deletar%20meus%20dados%20do%20app%20Clube%20Gazera%20de%20testes...."
                );
              }}
            >
              Deletar meus dados...
            </Text>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: Colors.primary }]}
      edges={["top", "left", "right"]}
    >
      <LogoutModal></LogoutModal>
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
        <Pressable
          onPress={() => setWarningVisible(true)}
          style={styles.logoutBtn}
        >
          <SimpleLineIcons name="logout" size={20} color="black" />
        </Pressable>
        <Text style={styles.warning}>
          *Atenção, aplicativo de testes, sem validade.
        </Text>
      </ImageBackground>

      <View style={styles.content}>
        <Slot />
      </View>
      {!path.startsWith("/partner") && (
        <View style={styles.tabBar}>
          <Pressable
            style={styles.tabButton}
            onPress={() => router.replace("/(tabs)")}
          >
            <Ionicons
              name={path === "/" ? "home" : "home-outline"}
              size={24}
              color={path === "/" ? Colors.primary : "gray"}
            />
            <Text style={styles.tabText}>Início</Text>
          </Pressable>

          <Pressable
            style={styles.tabButton}
            onPress={() => router.replace("/(tabs)/favorites")}
          >
            <Ionicons
              name={path === "/favorites" ? "star" : "star-outline"}
              size={24}
              color={path === "/favorites" ? Colors.primary : "gray"}
            />
            <Text style={styles.tabText}>Favoritos</Text>
          </Pressable>

          <Pressable
            style={styles.tabButton}
            onPress={() => router.replace("/(tabs)/info")}
          >
            <Ionicons
              name={
                path === "/info"
                  ? "information-circle"
                  : "information-circle-outline"
              }
              size={24}
              color={path === "/info" ? Colors.primary : "gray"}
            />
            <Text style={styles.tabText}>Info</Text>
          </Pressable>
        </View>
      )}
      <Toast />
    </SafeAreaView>
  );
}
