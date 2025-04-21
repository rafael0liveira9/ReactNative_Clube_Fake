import {
  Text,
  View,
  Modal,
  Button,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { fetchAllData } from "@/repository/data";
import { Colors } from "@/constants/Colors";
import Toast from "react-native-toast-message";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Image, StyleSheet } from "react-native";

interface PartnerParams {
  id: number;
  slug: string;
  fantasyName: string;
  logo: string;
  cover: string;
  discountAmount: number;
  publishedVersion: number;
  PartnerTags?: [
    {
      id?: number;
      tagsId?: number;
      partnerId?: number;
      createdBy?: number;
      createdAt?: string;
      deletedAt?: string;
      updatedAt?: string;
      deletedBy?: null;
      situation?: number;
    }
  ];
}

export default function PartnerScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState<boolean>(false),
    [user, setUser] = useState<{ id: string; name: string }>(),
    [search, setSearch] = useState<string>(""),
    [selectedDiscount, setSelectedDiscount] = useState<string>(""),
    [data, setData] = useState<PartnerParams[]>(),
    [dataCopy, setDataCopy] = useState<PartnerParams[]>(),
    [warningVisible, setWarningVisible] = useState<boolean>(false),
    [favorites, setFavorites] = useState<string[]>([]);

  const partner = dataCopy?.find((a) => a.id.toString() === id);

  async function getUserData() {
    try {
      const y = await SecureStore.getItemAsync("userId");
      const x = await SecureStore.getItemAsync("userName");
      const a = await SecureStore.getItemAsync("accept");
      if (x && y) {
        setUser({ id: y, name: x });
        console.log("Usuário recuperado");
      } else {
        console.log("Nenhum usuário para recuperar");
      }
      if (!a) {
        setWarningVisible(true);
      }
    } catch (error) {
      console.error("Erro ao recuperar usuário:", error);
      return null;
    }
  }

  async function getFavorites() {
    try {
      const x = await SecureStore.getItemAsync(`favorites${user?.id}`);
      if (x) {
        const list = JSON.parse(x);
        setFavorites(list);
      } else {
        console.log("Nenhum favorito para recuperar");
      }
    } catch (error) {
      console.error("Erro ao recuperar favoritos:", error);
      return null;
    }
  }

  const getData = async () => {
    setIsLoading(true);
    const x = await fetchAllData();
    if (x) {
      setData(x);
      setDataCopy(x);
    }
    setIsLoading(false);
  };

  async function Logout() {
    try {
      const keysToDelete = [
        "userToken",
        "userName",
        "userType",
        "userId",
        "accept",
      ];
      await Promise.all(
        keysToDelete.map((key) => SecureStore.deleteItemAsync(key))
      );
      console.log("SecureStore limpo!");
      Toast.show({
        type: "error",
        text1: `❌ Saindo do app.`,
      });
      router.replace("/(auth)");
    } catch (error) {
      console.error("Erro ao limpar SecureStore:", error);
    }
  }

  async function Accept() {
    try {
      await SecureStore.setItemAsync("accept", "1");
      setWarningVisible(false);
    } catch (error) {
      console.error("Erro ao aceitar termos:", error);
    }
  }

  function WarningModal() {
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
            <Text style={{ fontSize: 22, fontWeight: "600" }}>🔔 Atenção!</Text>
            <Text style={{ paddingVertical: 20, textAlign: "center" }}>
              Este é um aplicativo de testes, desenvolvido exclusivamente para
              fins acadêmicos. Nenhum dado, oferta ou desconto apresentado
              possui validade real. Todos os direitos sobre imagens, informações
              e marcas são de propriedade da Gazeta do Povo S/A.
            </Text>
            <View style={{ flexDirection: "row", gap: 20 }}>
              <Button
                color={Colors.check}
                title="✅ ACEITAR"
                onPress={Accept}
              />
              <Button
                color={Colors.default}
                title="❌ RECUSAR"
                onPress={Logout}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  useEffect(() => {
    getUserData();
    getData();
  }, []);

  useEffect(() => {
    if (user?.id) getFavorites();
  }, [user]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!partner) {
    return (
      <View style={styles.tabContainer}>
        <Text style={styles.parceirosTitle}>Parceiro não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <WarningModal />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.partnerBackground}
      >
        <Ionicons name="return-up-back-sharp" size={24} color="#cacaca" />
      </TouchableOpacity>
      <View
        style={{
          padding: 15,
        }}
      >
        <ImageBackground
          source={{
            uri: `https://clube-static.clubegazetadopovo.com.br/${partner.cover}`,
          }}
          style={styles.imageBack}
          imageStyle={{
            borderRadius: 10,
          }}
          resizeMode="cover"
        ></ImageBackground>
        <View style={styles.imageLogoBox}>
          <Image
            source={{
              uri: `https://clube-static.clubegazetadopovo.com.br/${partner.logo}`,
            }}
            style={styles.imageLogo}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: Colors.primary,
            marginBottom: 10,
          }}
        >
          {partner.fantasyName}
          <View>
            <Text style={styles.discountTag}>{partner.discountAmount}%OFF</Text>
          </View>
        </Text>

        {/* Conteúdo adicional aqui */}
        <Text style={{ fontSize: 16, color: "#555" }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Text>
        <Text style={{ fontSize: 16, color: "#555" }}>
          Aproveite descontos especiais para você! 🎉
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    width: "100%",
    margin: 0,
    paddingHorizontal: 10,
    paddingTop: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
    borderColor: "black",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderStyle: "solid",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  parceirosTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    paddingTop: 15,
  },
  partnerBackground: {
    marginVertical: 10,
    marginHorizontal: 10,
    width: 40,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 30,
    padding: 10,
    borderColor: "#cacaca",
    borderWidth: 1,
    borderStyle: "solid",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imageBack: {
    width: "100%",
    height: 220,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    shadowColor: "#000000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  imageLogoBox: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -60,
  },
  imageLogo: {
    width: 120,
    height: 120,
    borderRadius: 120,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderColor: "white",
    borderWidth: 3,
    borderStyle: "solid",
    zIndex: 1,
  },
  discountTag: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: Colors.check,
    color: "white",
    fontSize: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
  },
});
