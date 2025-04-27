import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Linking,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { styles } from "@/styles/tabs";
import Constants from "expo-constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as SecureStore from "expo-secure-store";
import { getMyData, update, updatePhoto } from "@/repository/auth";
import * as ImagePicker from "expo-image-picker";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { Colors } from "@/constants/Colors";
import Toast from "react-native-toast-message";
import {
  Button,
  ButtonText,
  EyeButton,
  Input,
  InputContainer,
  InputField,
} from "@/components/app/auth";

export default function InfoView() {
  const appVersion = Constants.expoConfig?.version;
  const appName = Constants.expoConfig?.name;
  const [isLoading, setIsLoading] = useState<boolean>(false),
    [mediaSelectorVisible, setMediaSelectorVisible] = useState<boolean>(false),
    [editModalVisible, setEditModalVisible] = useState<boolean>(true),
    [userId, setuserId] = useState(""),
    [photo, setPhoto] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [passwordConfirm, setPasswordConfirm] = useState(""),
    [name, setName] = useState(""),
    [isPasswordVisible, setIsPasswordVisible] = useState(false),
    [errors, setErrors] = useState<string[]>([]);

  async function getUserData() {
    setIsLoading(true);
    try {
      const y = await SecureStore.getItemAsync("userId");
      const z = await SecureStore.getItemAsync("userToken");
      const x = await SecureStore.getItemAsync("userName");
      const a = await SecureStore.getItemAsync("userEmail");

      if (y && z) {
        const data: any = await getMyData({ token: z });

        if (!!data) {
          setuserId(data?.user?.id);
          setName(data?.user?.client?.name);
          setEmail(data?.user?.email);
          setPhoto(data?.user?.client?.photo);

          console.log("Usuário recuperado");
        } else {
          console.log("Nenhum usuário para recuperar");
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Erro ao recuperar usuário:", error);
      setIsLoading(false);
      return null;
    }
  }

  async function updateData() {
    setIsLoading(true);
    try {
      const z = await SecureStore.getItemAsync("userToken");

      if (z) {
        const data: any = await update(name, z);

        if (!!data) {
          console.log("Usuário alterado com sucesso");
          Toast.show({
            type: "success",
            text1: `✅ Usuário alterado com sucesso.`,
          });
          setEditModalVisible(false);
        } else {
          console.log("Nenhum usuário para recuperar");
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Erro ao recuperar usuário:", error);
      setIsLoading(false);
      return null;
    }
  }

  function getMimeType(uri: string): string {
    const extension = uri.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      case "png":
        return "image/png";
      case "gif":
        return "image/gif";
      case "webp":
        return "image/webp";
      default:
        return "image/jpeg"; // fallback
    }
  }

  async function pickImage() {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Você precisa permitir acesso à galeria!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      const token = await SecureStore.getItemAsync("userToken");
      const name = selectedAsset.uri.split("/").pop() || "photo.jpg";
      const type = getMimeType(selectedAsset.uri) || "image/jpeg";

      const file = {
        uri: selectedAsset.uri,
        name: name,
        type: type,
      } as any;

      if (file && token) {
        const response = await updatePhoto(file, "fake-club", token);
        setPhoto(response.url);
        setMediaSelectorVisible(false);
      }
    }
    setMediaSelectorVisible(false);
    Toast.show({
      type: "success",
      text1: `✅ Imagem inserida com sucesso.`,
    });
  }

  async function openCamera() {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Você precisa permitir acesso à câmera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      const token = await SecureStore.getItemAsync("userToken");
      const name = selectedAsset.uri.split("/").pop() || "photo.jpg";
      const type = getMimeType(selectedAsset.uri) || "image/jpeg";

      const file = {
        uri: selectedAsset.uri,
        name: name,
        type: type,
      } as any;

      if (file && token) {
        const response = await updatePhoto(file, "fake-club", token);
        setPhoto(response.url);
        setMediaSelectorVisible(false);
      }
    }
    setMediaSelectorVisible(false);
    Toast.show({
      type: "success",
      text1: `✅ Imagem inserida com sucesso.`,
    });
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

  function MediaSelector() {
    return (
      <Modal
        visible={mediaSelectorVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setMediaSelectorVisible(false)}
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
              width: "auto",
              height: 200,
              padding: 40,
              backgroundColor: "white",
              borderRadius: 10,
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              gap: 30,
              position: "relative",
            }}
          >
            <TouchableOpacity
              onPress={() => setMediaSelectorVisible(false)}
              style={{
                position: "absolute",
                top: -10,
                right: -10,
                backgroundColor: "#dadada",
                padding: 1,
                borderRadius: 50,
              }}
            >
              <AntDesign name="closecircle" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => openCamera()}
              style={{
                backgroundColor: "#efefef",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                padding: 20,
                borderRadius: 10,
              }}
            >
              <Feather name="camera" size={60} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => pickImage()}
              style={{
                backgroundColor: "#efefef",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                padding: 20,
                borderRadius: 10,
              }}
            >
              <Feather name="image" size={60} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  function getErrorText(e: string) {
    switch (e) {
      case "name":
        return "Digite um nome válido";
        break;
      case "email":
        return "Digite um email válido";
        break;
      case "password1":
        return "A senha deve ter pelo menos 5 caracteres";
        break;
      case "password2":
        return "A senha deve ter pelo menos uma letra maiúscula";
        break;
      case "password3":
        return "A senha deve ter pelo menos um número";
        break;
      case "passwordConfirm":
        return "A duas senhas devem ser iguais";
        break;
      default:
        return "Erro desconhecido";
    }
  }

  function EditModal() {
    return (
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEditModalVisible(false)}
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
              width: 340,
              maxWidth: 340,
              minWidth: 300,
              minHeight: 200,
              maxHeight: "80%",
              padding: 30,
              backgroundColor: "white",
              borderRadius: 10,
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              gap: 30,
              position: "relative",
            }}
          >
            <TouchableOpacity
              onPress={() => setEditModalVisible(false)}
              style={{
                position: "absolute",
                top: -10,
                right: -10,
                backgroundColor: "#dadada",
                padding: 1,
                borderRadius: 50,
              }}
            >
              <AntDesign name="closecircle" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 16, fontWeight: 600 }}>
              Editar seu usuário
            </Text>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Input
                placeholder="Nome"
                value={name}
                onChangeText={setName}
                keyboardType="name"
                autoCapitalize="none"
                isCorrect={
                  name.length == 0 ? undefined : !errors.includes("name")
                }
              />
              {/* <InputContainer
                isCorrect={
                  password.length == 0
                    ? undefined
                    : !errors.includes("password1") ||
                      !errors.includes("password2") ||
                      !errors.includes("password3") ||
                      !errors.includes("passwordConfirm")
                }
              >
                <InputField
                  placeholder="Senha"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                />
                <EyeButton
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <Feather
                    name={isPasswordVisible ? "eye" : "eye-off"}
                    size={20}
                    color="#999"
                  />
                </EyeButton>
              </InputContainer>
              <InputContainer
                isCorrect={
                  passwordConfirm.length == 0
                    ? undefined
                    : !errors.includes("passwordConfirm")
                }
              >
                <InputField
                  placeholder="Confirmar Senha"
                  value={passwordConfirm}
                  onChangeText={setPasswordConfirm}
                  secureTextEntry={!isPasswordVisible}
                />
              </InputContainer>
              <View style={styles.errorBox}>
                {errors &&
                  errors.map((e: string, y: number) => {
                    let errorMessage = getErrorText(e);

                    return (
                      <View
                        key={y}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 2,
                          marginTop: 4,
                        }}
                      >
                        <AntDesign name="close" size={11} color="red" />
                        <Text style={styles.errorText}>{errorMessage}</Text>
                      </View>
                    );
                  })}
              </View> */}
              {isLoading ? (
                <Button>
                  <ButtonText>Salvando...</ButtonText>
                </Button>
              ) : (
                <Button onPress={updateData}>
                  <ButtonText>Salvar</ButtonText>
                </Button>
              )}
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={styles.tabContainer}>
      <MediaSelector></MediaSelector>
      <EditModal></EditModal>
      <Text style={[styles.parceirosTitle, { marginBottom: 40 }]}>
        Informações importantes
      </Text>
      {!!name && !!email && !isLoading ? (
        <View style={{ paddingHorizontal: 20, width: "100%" }}>
          <Separator icon={2}></Separator>
          <View style={styles.infoBox}>
            <View style={{ alignItems: "center", marginBottom: 16 }}>
              <TouchableOpacity
                style={{
                  width: "100%",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row",
                  position: "relative",
                }}
                onPress={() => setMediaSelectorVisible(true)}
              >
                <View
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                    position: "absolute",
                    backgroundColor: "#efefef",
                    padding: 6,
                    borderRadius: 50,
                    bottom: 0,
                    right: 0,
                    zIndex: 9,
                  }}
                >
                  <Feather name="edit-3" size={18} color="#444444" />
                </View>
                {photo ? (
                  <Image
                    source={{ uri: photo }}
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 120,
                      backgroundColor: "#cccccc",
                    }}
                  />
                ) : (
                  <View
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 120,
                      backgroundColor: "#cccccc",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 32, color: "#fff" }}>
                      {name?.charAt(0).toUpperCase() ?? "?"}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <Text onPress={() => setEditModalVisible(true)}>
              Nome: <Text style={{ fontWeight: 600 }}>{name}</Text>
              {"    "}
              <Feather name="edit-3" size={14} color="#444444" />
            </Text>
            <Text onPress={() => setEditModalVisible(true)}>
              E-mail: <Text style={{ fontWeight: 600 }}>{email}</Text>
              {"    "}
              {/* <Feather name="edit-3" size={14} color="#444444" /> */}
            </Text>
          </View>
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )}
      <View style={{ paddingHorizontal: 20 }}>
        <Separator icon={1}></Separator>
        <View style={styles.infoBox}>
          <Text>
            App name:{" "}
            <Text style={{ fontWeight: 600 }}>
              {Constants.expoConfig?.name}
            </Text>
          </Text>
          <Text>
            Version:{" "}
            <Text style={{ fontWeight: 600 }}>
              {Constants.expoConfig?.version}
            </Text>
          </Text>
          <Text>
            Author:{" "}
            <Text style={{ fontWeight: 600 }}>Rafael Mariano de Oliveira</Text>
          </Text>
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
            Info: Este é um aplicativo de testes, desenvolvido exclusivamente
            para fins acadêmicos. Nenhum dado, oferta ou desconto apresentado
            possui validade real. Todos os direitos sobre imagens, informações e
            marcas são de propriedade da Gazeta do Povo S/A.
          </Text>
        </View>
      </View>
    </View>
  );
}
