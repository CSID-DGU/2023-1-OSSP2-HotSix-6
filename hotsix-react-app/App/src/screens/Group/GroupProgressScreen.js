import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { CheckBox, Button } from 'react-native-elements';
import axios from 'axios';

const GroupProgressScreen = ({ route, navigation }) => {
  const { group } = route.params;
  const groupcode = group.group_code;
  const { jwt } = route.params;
  const [boxes, setBoxes] = useState([]);
  const [newBoxText, setNewBoxText] = useState('');
  const SERVER_URL = "http://192.168.242.164:8000/";

  useEffect(() => {
    console.log("그룹 프로그래스 jwt:", jwt);
  }, [jwt]);

  // Layout
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: ` ${group.group_name} `,
      headerStyle: {
        backgroundColor: '#3679A4',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
  }, [navigation, group, boxes]);

  // 처음에 screen 가져올때 박스 데이터를 가져오는 함수
  const fetchBoxesFromDB = () => {
    axios
      .get(`${SERVER_URL}/group/get-group-goal/?group_code=${encodeURIComponent(groupcode)}&jwt=${encodeURIComponent(jwt)}`)
      .then((response) => {
        const findbox = response.data;
        console.log(findbox);
        // GET 요청 성공 시 박스 데이터를 상태값으로 설정
        const fetchedBoxes = findbox.map((box) => ({
          text: box.goal_name,
          checked: box.goal_progress,
          id: box.goal_id
        }));
        setBoxes(fetchedBoxes);
      })
      .catch((error) => {
        console.error('박스 데이터 가져오기 실패:', error);
      });
  };
  useEffect(() => {
    fetchBoxesFromDB(); // 화면 진입 시 박스 데이터를 가져오도록 설정
  }, []);

  // 진행 항목 추가: box는 { checked: true or false, text: "" } 형태
  const addBox = () => {
    // 새로운 박스 데이터 생성
    const newBox = {
      checked: 0,
      text: newBoxText, // newBoxText는 TextInput에서 입력한 텍스트입니다.
      id: "",
    };
    // DB로 데이터 전송
    axios
      .post(`${SERVER_URL}/group/create-group-goal/`, {
        group_code: groupcode,
        jwt: jwt,
        goal_name: newBox.text,
      })
      .then((response) => {
        const id = response.data.goal_id; // Get the id from the response data
        console.log('박스 데이터가 추가되었습니다. ID:', id);
        newBox.id = id; // Add the id to the newBox object
        setBoxes([...boxes, newBox]);
        setNewBoxText('');
      })
      .catch((error) => {
        console.error('박스 데이터 추가에 실패하였습니다.', error);
      });
  };

  // 박스 삭제
  const deleteBox = (index) => {
    const deletedBox = boxes[index];
    axios
      .post(`${SERVER_URL}/group/delete-group-goal/`, {
        jwt: jwt,
        goal_id: deletedBox.id
      })
      .then((response) => {
        console.log('박스 데이터가 삭제되었습니다.');
        const updatedBoxes = [...boxes];
        updatedBoxes.splice(index, 1);
        setBoxes(updatedBoxes);
      })
      .catch((error) => {
        console.error('박스 데이터 삭제에 실패하였습니다.', error);
      });
  };

  // 박스 안에 텍스트 handle
  const handleTextChange = (text, index) => {
    const updatedBoxes = [...boxes];
    updatedBoxes[index].text = text;
    setBoxes(updatedBoxes);
  };

  // 박스 check
  const handleCheckBoxChange = (index) => {
    const updatedBoxes = [...boxes];
    updatedBoxes[index].checked = updatedBoxes[index].checked ? 0 : 1;
    setBoxes(updatedBoxes);

    console.log(updatedBoxes[index].id);
    console.log(updatedBoxes[index].checked);

    // DB로 데이터 전송
    const changedBox = updatedBoxes[index];
    axios
      .put(`${SERVER_URL}/group/update-group-goal/`, {
        goal_id: changedBox.id,
        jwt: jwt,
        goal_progress: changedBox.checked
      })
      .then((response) => {
        console.log('박스 데이터가 업데이트되었습니다.');
      })
      .catch((error) => {
        console.error('박스 데이터 업데이트에 실패하였습니다.', error);
      });
  };

  // 진행사항 프로그래스 나타내기
  const calculateProgress = () => {
    const totalBoxes = boxes.length;
    const completedBoxes = boxes.filter((box) => box.checked === 1).length;
    return totalBoxes === 0 ? 0 : (completedBoxes / totalBoxes) * 100;
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {boxes.map((box, index) => (
          <View key={index} style={styles.box}>
            <TextInput
              style={styles.textInput}
              placeholder="텍스트 입력"
              value={box.text}
              onChangeText={(text) => handleTextChange(text, index)}
            />
            <CheckBox checked={box.checked} onPress={() => handleCheckBoxChange(index)} />
            <TouchableOpacity onPress={() => deleteBox(index)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>삭제</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TextInput
          style={styles.input}
          placeholder="텍스트 입력"
          value={newBoxText}
          onChangeText={(text) => setNewBoxText(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={addBox}>
          <Text style={styles.addButtonText}>진행 항목 추가</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.progressBar}>
        <View
          style={{
            width: `${calculateProgress()}%`,
            height: '100%',
            backgroundColor: '#3679A4',
            borderRadius: 5,
          }}
        />
        <Text style={styles.progressText}>{`${boxes.filter((box) => box.checked).length} / ${boxes.length}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  content: {
    flexGrow: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: '#3679A4',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#3679A4',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#3679A4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 14,
  },
  progressBar: {
    width: '100%',
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressText: {
    color: '#ffffff',
    fontSize: 14,
    marginLeft: 5,
  },
  completeButton: {
    marginRight: 10,
  },
  completeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GroupProgressScreen;