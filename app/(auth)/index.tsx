import React, { useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { styles } from "../../styles/auth";
import { Feather } from "@expo/vector-icons";
import {
  Button,
  Input,
  InputContainer,
  ButtonText,
  InputField,
  EyeButton,
  SecondaryButton,
  SecondaryButtonText,
} from "@/components/app/auth";
import { login } from "@/repository/auth";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>(""),
    [password, setPassword] = useState<string>(""),
    [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false),
    [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleLogin() {
    if (email.length == 0 || password.length == 0) {
      console.error("Preencha todos os campos.");
      Toast.show({
        type: "error",
        text1: "❌ Atenção, preencha todos os campos.",
      });
      return null;
    }

    setIsLoading(true);
    const res = await login({ email, password });

    if (res?.user) {
      try {
        await SecureStore.setItemAsync("userId", res?.user?.id.toString());
        await SecureStore.setItemAsync("userToken", res?.user?.token);
        await SecureStore.setItemAsync("userEmail", res?.user?.email);
        await SecureStore.setItemAsync("userName", res?.user?.name);
        await SecureStore.setItemAsync("userType", res?.user?.type.toString());

        Toast.show({
          type: "success",
          text1: "✅ Login efetuado com sucesso.",
        });

        router.replace("/(tabs)");
      } catch (error) {
        setIsLoading(false);
        console.error("Erro ao salvar token:", error);
      }
    } else {
      setIsLoading(false);
      console.error(res?.message);
      Toast.show({
        type: "success",
        text1: `✅ ${res?.message}.`,
      });
    }
    setIsLoading(false);
  }

  function handleRegister() {
    router.push("./register");
  }

  function forgotPassword() {
    Toast.show({
      type: "success",
      text1: "🔄 Função não disponivel ainda.",
    });
  }

  return (
    <View style={styles.authContainer}>
      <Text style={styles.authTitle}>Login</Text>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <InputContainer>
        <InputField
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
        />
        <EyeButton onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Feather
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={20}
            color="#999"
          />
        </EyeButton>
      </InputContainer>

      <Button onPress={!isLoading ? handleLogin : () => {}}>
        <ButtonText>
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="#FFFFFFFF"
            ></ActivityIndicator>
          ) : (
            "Entrar"
          )}
        </ButtonText>
      </Button>

      <SecondaryButton onPress={!isLoading ? handleRegister : () => {}}>
        <SecondaryButtonText>Cadastrar</SecondaryButtonText>
      </SecondaryButton>
      <Text
        style={styles.authInfoLinkText}
        onPress={!isLoading ? forgotPassword : () => {}}
      >
        Esqueceu sua senha?
      </Text>
    </View>
  );
}
