import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { styles } from "../../styles/auth";
import {
  Button,
  Input,
  ButtonText,
  SecondaryButton,
  SecondaryButtonText,
  InputContainer,
  InputField,
  EyeButton,
} from "@/components/app/auth";
import { Feather, AntDesign } from "@expo/vector-icons";
import { register } from "@/repository/auth";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";

export default function RegisterScreen() {
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [passwordConfirm, setPasswordConfirm] = useState(""),
    [name, setName] = useState(""),
    [isPasswordVisible, setIsPasswordVisible] = useState(false),
    [errors, setErrors] = useState<string[]>([]),
    [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleRegister() {
    if (
      errors.length > 0 ||
      name.length == 0 ||
      password.length == 0 ||
      email.length == 0
    ) {
      console.error("Preencha todos os campos.");
      Toast.show({
        type: "error",
        text1: "❌ Atenção, preencha todos os campos.",
      });
      return null;
    }

    setIsLoading(true);
    const res = await register({ email, password, name });

    console.log("user", res?.data?.user);
    console.log("client", res?.data?.client);

    if (res?.data) {
      try {
        await SecureStore.setItemAsync(
          "userId",
          res?.data?.user?.id.toString()
        );
        await SecureStore.setItemAsync("userToken", res?.data?.user?.token);
        await SecureStore.setItemAsync("userEmail", res?.data?.user?.email);
        await SecureStore.setItemAsync("userName", res?.data?.client?.name);
        await SecureStore.setItemAsync(
          "userType",
          res?.data?.user?.typeId.toString()
        );

        Toast.show({
          type: "success",
          text1: "✅ Cadastro efetuado com sucesso.",
        });

        router.replace("/(tabs)");
      } catch (error) {
        setIsLoading(false);
        console.error("Erro ao salvar token:", error);
      }
    } else {
      setIsLoading(false);

      switch (res?.status) {
        case 302:
          Toast.show({
            type: "error",
            text1: "❌ Este endereço de e-mail ja está cadsatrado.",
          });
          break;
        case 404:
          Toast.show({
            type: "error",
            text1: "❌ Fora do ar, tente mais tarde.",
          });
          break;
        case 500:
          Toast.show({
            type: "error",
            text1: "❌ Fora do ar, tente mais tarde.",
          });
          break;

        default:
          Toast.show({
            type: "error",
            text1: "❌ Ocorreu um erro desconhecido, tente mais tarde.",
          });
          break;
      }
    }
    setIsLoading(false);
  }

  function handleAlready() {
    router.push("./");
  }

  function errorCheck() {
    let updatedErrors = [];

    if (name && name.length < 3) {
      updatedErrors.push("name");
    }
    if (password && password.length < 4) {
      updatedErrors.push("password1");
    }
    if (password && !/[A-Z]/.test(password)) {
      updatedErrors.push("password2");
    }
    if (password && (!/[0-9]/.test(password) || !/[a-z]/.test(password))) {
      updatedErrors.push("password3");
    }
    if (
      password &&
      passwordConfirm &&
      password.length > 0 &&
      passwordConfirm.length > 0
    ) {
      if (password !== passwordConfirm) {
        updatedErrors.push("passwordConfirm");
      }
    }
    if (email && email.length > 0) {
      const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;

      if (!emailRegex.test(email)) {
        updatedErrors.push("email");
      }
    }

    setErrors(updatedErrors);
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

  useEffect(() => {
    errorCheck();
  }, [name, password, passwordConfirm, email]);

  return (
    <View style={styles.authContainer}>
      <Text style={styles.authTitle}>Cadastrar-se</Text>
      <Input
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        keyboardType="name"
        autoCapitalize="none"
        isCorrect={name.length == 0 ? undefined : !errors.includes("name")}
      />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        isCorrect={email.length == 0 ? undefined : !errors.includes("email")}
      />
      <InputContainer
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
        <EyeButton onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
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
      </View>
      {isLoading ? (
        <Button>
          <ButtonText>Enviando...</ButtonText>
        </Button>
      ) : (
        <Button onPress={handleRegister}>
          <ButtonText>Salvar</ButtonText>
        </Button>
      )}
      <Text style={styles.authInfoLinkText} onPress={handleAlready}>
        Já tenho cadastro.
      </Text>
    </View>
  );
}
