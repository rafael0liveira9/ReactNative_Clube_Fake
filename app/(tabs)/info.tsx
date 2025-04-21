import React, { useEffect, useState } from "react";
import { View, Text, Linking } from "react-native";
import { styles } from "@/styles/tabs";
import Constants from "expo-constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as SecureStore from "expo-secure-store";

export default function InfoView() {
  const appVersion = Constants.expoConfig?.version;
  const appName = Constants.expoConfig?.name;
  const [isLoading, setIsLoading] = useState<boolean>(false),
    [warningVisible, setWarningVisible] = useState<boolean>(false),
    [user, setUser] = useState<{
      id: string;
      name: string;
      email: string | null;
    }>();

  async function getUserData() {
    try {
      const y = await SecureStore.getItemAsync("userId");
      const x = await SecureStore.getItemAsync("userName");
      const a = await SecureStore.getItemAsync("userEmail");

      if (x && y) {
        setUser({
          id: y,
          name: x,
          email: a,
        });
        console.log("Usuário recuperado");
      } else {
        console.log("Nenhum usuário para recuperar");
      }
    } catch (error) {
      console.error("Erro ao recuperar usuário:", error);
      return null;
    }
  }

  function Separator({ icon }: { icon: number }) {
    return (
      <View style={styles.separatorView}>
        {icon == 1 ? (
          <AntDesign name="infocirlce" size={24} color="#aaaaaa" />
        ) : (
          <FontAwesome name="user" size={24} color="#aaaaaa" />
        )}
        <View
          style={{ width: "80%", height: 1, backgroundColor: "#aaaaaa" }}
        ></View>
      </View>
    );
  }

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <View style={styles.tabContainer}>
      <Text style={[styles.parceirosTitle, { marginBottom: 40 }]}>
        Informações importantes
      </Text>
      <Separator icon={1}></Separator>
      <View style={styles.infoBox}>
        <Text>App name: {Constants.expoConfig?.name}</Text>
        <Text>Version: {Constants.expoConfig?.version}</Text>
        <Text>Author: Rafael Mariano de Oliveira</Text>
        <Text>
          Github:{" "}
          <Text
            style={styles.logoutInfoLinkText}
            onPress={() => {
              Linking.openURL("https://github.com/rafael0liveira9");
            }}
          >
            https://github.com/rafael0liveira9
          </Text>
        </Text>
        <Text style={{ textAlign: "left" }}>
          Info: Este é um aplicativo de testes, desenvolvido exclusivamente para
          fins acadêmicos. Nenhum dado, oferta ou desconto apresentado possui
          validade real. Todos os direitos sobre imagens, informações e marcas
          são de propriedade da Gazeta do Povo S/A.
        </Text>
      </View>
      <Separator icon={2}></Separator>
      <View style={styles.infoBox}>
        <Text>User name: {user?.name}</Text>
        <Text>E-mail: {user?.email}</Text>
      </View>
    </View>
  );
}
