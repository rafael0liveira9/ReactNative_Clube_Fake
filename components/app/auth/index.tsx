import styled from "styled-components/native";
import { Colors } from "@/constants/Colors";
import { TextInput } from "react-native";

interface InputProps {
  secureTextEntry?: boolean;
}

const InputContainer = styled.View`
  width: 100%;
  height: 50px;
  background-color: #f1f1f1;
  border-radius: 25px;
  padding: 0 20px;
  margin-bottom: 15px;
  flex-direction: row;
  align-items: center;
  border: 2px solid
    ${({ isCorrect }: any) =>
      isCorrect === undefined
        ? "transparent"
        : isCorrect
        ? "#00A506FF"
        : "#FF0000FF"};
`;

const InputField = styled(TextInput)`
  flex: 1;
  font-size: 16px;
  color: ${Colors.light.text};
`;

const EyeButton = styled.TouchableOpacity`
  padding-left: 10px;
`;

const Input = styled(TextInput)<InputProps>`
  width: 100%;
  height: 50px;
  background-color: #f1f1f1;
  border-radius: 25px;
  padding: 0 20px;
  margin-bottom: 15px;
  font-size: 16px;
  border: 2px solid
    ${({ isCorrect }: any) =>
      isCorrect === undefined
        ? "transparent"
        : isCorrect
        ? "#00A506FF"
        : "#FF0000FF"};
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: ${Colors.primary};
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const ButtonTest = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: #ffffff;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const SecondaryButton = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  border: 2px solid ${Colors.primary};
  border-radius: 25px;
  justify-content: center;
  align-items: center;
`;

const SecondaryButtonText = styled.Text`
  color: ${Colors.primary};
  font-size: 16px;
  font-weight: bold;
`;

export {
  Input,
  Button,
  ButtonText,
  SecondaryButton,
  SecondaryButtonText,
  InputContainer,
  InputField,
  EyeButton,
  ButtonTest,
};
