import React from "react";
import { StyleSheet, Text, View, TouchableOpacity,ImageBackground,Image} from "react-native";

const schedules = [
  [0,0,0,1,0,1,0], // 8시
  [0,0,0,1,0,1,0], // 8시 30분
  [0,0,0,1,0,1,0], // 9시
  [0,0,0,1,0,1,0], // 9시 30분
  [0,1,0,1,0,1,0], // 10시
  [0,1,0,0,0,1,0], // 10시 30분
  [1,1,0,0,0,1,0], // 11시
  [1,1,0,0,0,1,0], // 11시 30분
  [1,1,0,0,0,0,0], // 12시
  [1,1,0,0,0,0,0], // 12시 30분
  [0,1,0,0,0,0,0], // 13시
  [0,0,0,0,0,0,0], // 13시 30분
  [0,0,0,1,0,0,0], // 14시
  [0,0,0,1,0,0,0], // 14시 30분
  [0,0,0,1,0,0,0], // 15시
  [0,0,0,1,0,0,0], // 15시 30분
  [0,0,0,1,0,0,0], // 16시
  [0,0,0,1,0,0,0], // 16시 30분
  [1,0,0,1,0,0,0], // 17시
  [1,0,0,0,0,0,0], // 17시 30분
  [1,0,0,0,0,0,0], // 18시
  [0,0,0,0,0,0,1], // 18시 30분
  [0,0,0,0,0,0,1], // 19시
  [0,0,0,0,0,0,1], // 19시 30분
  [0,0,0,0,0,0,1], // 20시
  [0,0,0,0,0,0,0], // 20시 30분
  [0,0,0,0,0,0,0], // 21시
  [0,0,0,0,0,0,0], // 21시 30분
  [0,0,0,0,1,0,0], // 22시
  [0,0,0,0,1,0,0], // 22시 30분
  [0,0,0,0,1,0,0], // 23시
  [0,0,0,0,1,0,0], // 23시 30분
  [0,0,0,0,1,0,0], // 24시
];

const RegisterScreen = ({ navigation }) => {


  return (
    <ImageBackground source={require("hotsix-react-app/assets/backgroundimg3.png")} style={styles.container}>
       <Image
            source={require("hotsix-react-app/assets/MainLogo.png")}
            style={styles.logoImage}
          />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("InsertPhoto")}
        >
          <Text style={styles.loginButtonText}>사진으로 등록하기</Text>
          <Text style={styles.Text}>이미지 파일로 내 시간표를 등록해보세요!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("InsertIcs")}
        >
          <Text style={styles.loginButtonText}>ics파일로 등록하기</Text>
          <Text style={styles.Text}>캘린더 파일로 내 시간표를 등록해보세요!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Ranking', {schedules : schedules})}
        >
          <Text style={styles.loginButtonText}>시간표 우선 순위 등록하기</Text>
          <Text style={styles.Text}>내가 원하는 시간에 우선순위를 추가해보세요!</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  logoImage: {
    width: "80%",
    height: 200,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 30,
    width: "80%",
  },
  loginButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  loginButtonText: {
    color: "#3679A4",
    fontSize: 20,
  },
  Text: {
    color: "#888888",
    fontSize: 14,
    marginTop: 8,
  },
});
