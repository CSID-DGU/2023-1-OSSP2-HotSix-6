import React, { useState, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const SERVER_URL = "http://192.168.242.24:8000"; //백엔드 서버 주소로 변경해야함 + 토큰 추가

const InsertIcsScreen = ({ navigation, route }) => {
  const [schedules, setSchedules] = useState([[]]);
  const [selectedFile, setSelectedFile] = useState(null);
  const { jwt } = route.params;

  useEffect(() => {
    console.log("ics 파일 jwt:", jwt);
  }, [jwt]);

  //파일 선택
  const handleFileSelection = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "text/calendar", // ICS 파일
        copyToCacheDirectory: false,
        multiple: false,
      });

      if (res.type === "success") {
        setSelectedFile(res);
      } else {
        console.log("파일 형식이 맞지 않습니다. .ics파일을 등록해주세요");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //파일 업로드
  const handleUpload = async () => {
    const help = jwt.toString();
    if (selectedFile) {
      try {
        const fileUri = selectedFile.uri;
        const formData = new FormData();
        formData.append("file", {
          uri: fileUri,
          name: selectedFile.name,
          type: "text/calendar",
          jwt: jwt,
        });

        const fileJson = JSON.stringify(formData["_parts"]);
        console.log(fileJson);

        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        const Response_post = await axios.post(
          `${SERVER_URL}/user/save-ics-file/`,
          formData,
          config
        );

        const Response_put = await axios.put(
          `${SERVER_URL}/user/ics-time-table/`,
          { jwt: jwt }
        );

        const Response_get = await axios.get(
          `${SERVER_URL}/user/view-time-table/?jwt=${encodeURIComponent(jwt)}`
        );

        const imageData = Response_get.data.time_table;
        //console.log(imageData);
        setTimeout(() => {
          console.log("이미지 데이터", imageData);
        }, 3000);
        setSchedules(imageData);
        setTimeout(() => {
          console.log("이미지 데이터", imageData);
        }, 3000);

        if (Response_get.status === 200) {
          Alert.alert("ics 파일이 전송됐습니다.");
          navigation.navigate("Ranking", { schedules, jwt });
        }
      } catch (error) {
        console.log(error);
        Alert.alert(
          "파일 전송 실패",
          "파일을 서버로 전송하는 데 실패했습니다."
        );
      }
    }
  };

  return (
    <ImageBackground
      source={require("hotsix-react-app/assets/backgroundimg2.png")}
      style={styles.container}
    >
      <Text style={styles.Text}>캘린더파일로</Text>
      <Text style={styles.loginButtonText}> 내 시간표를 등록해보세요! </Text>
      <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>
          {selectedFile ? (
            <MaterialCommunityIcons
              name="file-check-outline"
              style={styles.icon}
            />
          ) : (
            <MaterialCommunityIcons
              name="file-plus-outline"
              style={styles.icon}
            />
          )}
          {selectedFile && <Text>{selectedFile.name}</Text>}
          <TouchableOpacity onPress={handleFileSelection} style={styles.button}>
            <Text style={styles.buttonText}>.ics 파일 선택</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleUpload} style={styles.uploadButton}>
          <Text style={styles.buttonText}>업로드</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    paddingHorizontal: 10,
    backgroundColor: "#ffffff",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
  },
  iconContainer: {
    width: 300,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dotted",
    borderWidth: 3,
    borderColor: "gray",
  },
  icon: {
    fontSize: 90,
    color: "gray",
    marginBottom: 10,
  },
  uploadButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#3679A4",
    borderRadius: 5,
    width: 300,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#3679A4",
    borderRadius: 5,
    marginTop: 10,
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 25,
    marginBottom: 20,
  },
  Text: {
    color: "#ffffff",
    fontSize: 25,
  },
});
export default InsertIcsScreen;
