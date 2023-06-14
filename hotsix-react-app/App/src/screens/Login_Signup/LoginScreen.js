import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Alert } from "react-native";
import axios from "axios";
import { handleVerification } from "./VerificationScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SERVER_URL = "http://192.168.242.164:8000";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [jwt, setJwt] = useState("");

  const handleLoginButtonPress = async () => {
    try {
      const response = await axios.post(`${SERVER_URL}/user/login/`, {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        Alert.alert("로그인 성공!");
        // console.log("JWT:", response.data.jwt);
        // const cookies = response.headers["set-cookie"];
        // await AsyncStorage.setItem("cookies", JSON.stringify(cookies));
        setJwt(response.data.jwt);
        navigation.navigate("Main", { jwt: jwt }, { email : email });
      } else if (response.status === 401) {
        //이메일 인증 완료 전일 때
        Alert.alert("로그인 실패. 이메일 인증을 완료해주세요");
        navigation.navigate("Verification", { email: email });
        handleVerification(); //이메일 재전송 요청
      } else {
        Alert.alert("로그인 실패. 아이디와 패스워드를 확인해주세요.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("로그인:", jwt);
  }, [jwt]);

  return (
    <ImageBackground source={require("hotsix-react-app/assets/backgroundimg1.png")} style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>로그인</Text>
        <TextInput
          style={styles.input}
          placeholder="이메일"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLoginButtonPress}
        >
          <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.resetPasswordText}>비밀번호 찾기</Text>
        </TouchableOpacity>

   
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    marginTop: 120,
    paddingHorizontal:10,
    paddingVertical:20,
    borderRadius:15,
    backgroundColor: "#ffffff",
    elevation: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  input: {
    width: "80%",
    borderColor: "#dddddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    backgroundColor: "#f2f2f2",
  },
  loginButton: {
    width: "80%",
    backgroundColor: "#3679A4",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  resetPasswordText: {
    marginTop: 16,
    fontSize: 14,
    color: "#3679A4",
  },
});

export default LoginScreen;
