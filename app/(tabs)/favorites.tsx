import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
  Modal,
  Button,
} from "react-native";
import { styles } from "../../styles/tabs";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { fetchAllData } from "@/repository/data";
import { Colors } from "@/constants/Colors";
import PartnerCard from "@/components/app/tabs/partnerCard";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

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

export default function FavoritesScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(false),
    [user, setUser] = useState<{ id: string; name: string }>(),
    [search, setSearch] = useState<string>(""),
    [selectedDiscount, setSelectedDiscount] = useState<string>(""),
    [data, setData] = useState<PartnerParams[]>(),
    [dataCopy, setDataCopy] = useState<PartnerParams[]>(),
    [warningVisible, setWarningVisible] = useState<boolean>(false),
    [favorites, setFavorites] = useState<string[]>([]);

  async function getUserData() {
    try {
      const y = await SecureStore.getItemAsync("userId");
      const x = await SecureStore.getItemAsync("userName");
      const a = await SecureStore.getItemAsync("accept");
      if (x && y) {
        setUser({
          id: y,
          name: x,
        });
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
      }
      console.log("Nenhum Favorito para recuperar");
    } catch (error) {
      console.error("Erro ao recuperar favorites:", error);
      return null;
    }
  }

  async function postFavorites(string: string) {
    const already = favorites.includes(string);
    const newList = already
      ? favorites.filter((a) => a != string)
      : [...favorites, string];

    try {
      await SecureStore.setItemAsync(
        `favorites${user?.id}`,
        JSON.stringify(newList)
      );
      setFavorites(newList);

      Toast.show({
        type: "success",
        text1: `✅ Favorito ${already ? "removido" : "salvo"} com sucesso.`,
      });
    } catch (error) {
      console.error("Erro ao salvar favoritos:", error);
    }
  }

  const discountList = [
    "10",
    "20",
    "30",
    "40",
    "50",
    "60",
    "70",
    "80",
    "90",
    "100",
  ];

  const getData = async () => {
    setIsLoading(true);
    const x = await fetchAllData();

    if (x) {
      setData(x);
      setDataCopy(x);
      setIsLoading(false);
    }
  };

  function filtering() {
    if (data) {
      let newData = data;

      if (favorites && favorites.length > 0) {
        newData.sort((a, b) => {
          const aIsFavorite = favorites.includes(a.id.toString());
          const bIsFavorite = favorites.includes(b.id.toString());

          if (aIsFavorite && !bIsFavorite) return -1;
          if (!aIsFavorite && bIsFavorite) return 1;
          return 0;
        });
      }

      if (!search && (!selectedDiscount || selectedDiscount == "0")) {
        setDataCopy(data);
        return null;
      }

      if (search) {
        newData = newData.filter(
          (a) => a.fantasyName.includes(search) || a.slug.includes(search)
        );
      }

      if (selectedDiscount && selectedDiscount !== "0") {
        switch (selectedDiscount) {
          case "10":
            newData = newData.filter(
              (a) => a.discountAmount >= 10 && a.discountAmount < 20
            );
            break;
          case "20":
            newData = newData.filter(
              (a) => a.discountAmount >= 20 && a.discountAmount < 30
            );
            break;
          case "30":
            newData = newData.filter(
              (a) => a.discountAmount >= 30 && a.discountAmount < 40
            );
            break;
          case "40":
            newData = newData.filter(
              (a) => a.discountAmount >= 40 && a.discountAmount < 50
            );
            break;
          case "50":
            newData = newData.filter(
              (a) => a.discountAmount >= 50 && a.discountAmount < 60
            );
            break;
          case "60":
            newData = newData.filter(
              (a) => a.discountAmount >= 60 && a.discountAmount < 70
            );
            break;
          case "70":
            newData = newData.filter(
              (a) => a.discountAmount >= 70 && a.discountAmount < 80
            );
            break;
          case "80":
            newData = newData.filter(
              (a) => a.discountAmount >= 80 && a.discountAmount < 90
            );
            break;
          case "90":
            newData = newData.filter(
              (a) => a.discountAmount >= 90 && a.discountAmount < 100
            );
            break;
          case "100":
            newData = newData.filter((a) => a.discountAmount === 100);
            break;
          default:
            break;
        }
      }

      const sortedData = newData.sort(
        (a, b) => a.discountAmount - b.discountAmount
      );

      setDataCopy(sortedData);
    }
  }

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
              paddingVertical: 40,
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: 600 }}>🔔 Atenção!</Text>
            <Text style={{ paddingVertical: 20 }}>
              Este é um aplicativo de testes, desenvolvido exclusivamente para
              fins acadêmicos. Nenhum dado, oferta ou desconto apresentado
              possui validade real. Todos os direitos sobre imagens, informações
              e marcas são de propriedade da Gazeta do Povo S/A.
            </Text>
            <View
              style={{
                display: "flex",
                gap: 20,
                flexDirection: "row",
              }}
            >
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

  useEffect(() => {
    filtering();
  }, [search, selectedDiscount, favorites]);

  return (
    <View style={styles.tabContainer}>
      <WarningModal></WarningModal>
      <Text style={styles.parceirosTitle}>Seus parceiros favoritos</Text>

      {!isLoading ? (
        dataCopy && favorites && dataCopy.length > 0 && favorites.length > 0 ? (
          <FlatList
            style={{ width: "100%", padding: 20 }}
            data={dataCopy}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const isFavorite = favorites.includes(item.id.toString());
              if (isFavorite) {
                return (
                  <PartnerCard
                    item={item}
                    isFavorite={isFavorite}
                    post={postFavorites}
                  ></PartnerCard>
                );
              } else {
                return null;
              }
            }}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Nenhum resultado encontrado</Text>
          </View>
        )
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )}
    </View>
  );
}
