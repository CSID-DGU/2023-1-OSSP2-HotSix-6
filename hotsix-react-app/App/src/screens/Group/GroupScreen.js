import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import axios from "axios";

const GroupScreen = ({ route }) => {
  const SERVER_URL = "http://192.168.242.164:8000";
  const navigation = useNavigation();
  const { email } = route.params;
  const { jwt } = route.params;

  useEffect(() => {
    console.log("내그룹 jwt:", jwt);
  }, [jwt]);

  const [groups, setGroups] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
  const [isGroupMembersModalVisible, setGroupMembersModalVisible] = useState(false);
  const [groupMembers, setGroupMembers] = useState([]);

  useEffect(() => {
    // 사용자가 속한 그룹이름과 그룹코드를 가져온다. 위의 형식대로
    axios
      .get(`${SERVER_URL}/group/get-group/?jwt=${encodeURIComponent(jwt)}`)
      .then((response) => {
        const userGroups = response.data;
        console.log(response.data);
        setGroups(userGroups);
      });
  }, []);

  const toggleModal = (group) => {
    setSelectedGroup(group);
    setModalVisible(!isModalVisible);
  };

  const leaveGroup = async () => {
    if (selectedGroup) {
      try {
        //백엔드한테 그룹에서 나가는 요청보내는 함수 만들어서 실행하고
        await removeUserFromGroup(selectedGroup.group_code, jwt);
        // 이게 백엔드에서는 느리니까 일시적으로 화면에서 지우고 나중에 백엔드가 되면 되는대로 바꾸는
        // 최적화 방법이라고는 하는디 일단 이렇게 해놓겠음.
        const updatedGroups = groups.filter(
          (group) => group.group_code !== selectedGroup.group_code
        );
        setGroups(updatedGroups);
        // 모달 닫기
        setConfirmModalVisible(false);
        setModalVisible(false);
      } catch (error) {
        console.error("Failed to leave the group:", error);
      }
    }
  };

  // 그룹에서 나가는 요청 보내는 함수 만들어서 실행 부분 구현
  const removeUserFromGroup = async (group_code, jwt) => {
    try {
      const response = await axios.post(`${SERVER_URL}/group/delete-group/`, {
        group_code: group_code,
        jwt: jwt,
      });
      if (response.status === 200) {
        console.log("그룹에서 나갑니다...");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderGroupItem = ({ item }) => (
    <TouchableWithoutFeedback
      onLongPress={() => toggleModal(item)}
      onPress={() => navigation.navigate("GroupDetails", { group: item, jwt })}
    >
      <View style={styles.groupItem}>
        <Text style={styles.groupName}>{item.group_name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  const showGroupMembers = (selectedGroup) => {
    axios
      .get(`${SERVER_URL}/group/get-group-member/?group_code=${encodeURIComponent(selectedGroup.group_code)}&jwt=${encodeURIComponent(jwt)}`)
      .then((response) => {
        const members = response.data.member_list;
        console.log("맴버들 " + members);
        setGroupMembers(members);
        setModalVisible(false); // 모달 닫기
        setGroupMembersModalVisible(true); // 멤버 목록 모달 열기
      })
      .catch((error) => {
        console.error("그룹 멤버를 불러오는데 실패했습니다:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>내 그룹</Text>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.group_code.toString()}
        renderItem={renderGroupItem}
      />
      <TouchableOpacity
        style={styles.JoinGroupButton}
        onPress={() => navigation.navigate("JoinGroup", { jwt: jwt })}
      >
        <Text style={styles.JoinGroupButtonText}>
          그룹 코드로 그룹 입장하기
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.CreateGroupButton}
        onPress={() => navigation.navigate("Makegroup", { jwt: jwt })}
      >
        <Text style={styles.CreateGroupButtonText}>새 그룹 만들기</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          {selectedGroup && (
            <>
              <Text style={styles.modalText}>
                팀장 이메일 : {selectedGroup.creator_id}
              </Text>
              <Text style={styles.modalText}>
                그룹 코드 : {selectedGroup.group_code}
              </Text>
            </>
          )}
          <TouchableOpacity
            onPress={() => console.log("그룹 이름 수정하기")}
          >
            <Text style={styles.modalOption}>그룹 이름 수정하기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setConfirmModalVisible(true)}>
            <Text style={styles.modalOption}>그룹 나가기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showGroupMembers(selectedGroup)}>
            <Text style={styles.modalOption}>그룹 멤버 확인하기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal}>
            <Text style={styles.modalClose}>닫기</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal isVisible={isConfirmModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>정말 나가시겠습니까?</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={leaveGroup}>
              <Text style={styles.modalButton}>확인</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setConfirmModalVisible(false)}
            >
              <Text style={styles.modalButton}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal isVisible={isGroupMembersModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>그룹 멤버</Text>
          <FlatList
            data={groupMembers}
            keyExtractor={( item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.memberItem}>
                <Text style={styles.memberEmail}>{item}</Text>
              </View>
            )}
          />
          <TouchableOpacity onPress={() => setGroupMembersModalVisible(false)}>
            <Text style={styles.modalClose}>닫기</Text>
          </TouchableOpacity>
        </View>
      </Modal>     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },
  groupItem: {
    backgroundColor: "#F9F9F9",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderLeftWidth: 10,
    borderColor: "#F56D6D",
    elevation: 5,
  },
  groupName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalText: {
    color: "#3679A4",
    fontSize: 16,
    marginBottom: 10,
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  memberItem: {
    backgroundColor: "#F9F9F9",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 5,
  },
  modalClose: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
    marginTop: 20,
  },
  modalOption: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  memberEmail: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalClose: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
    marginTop: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  modalButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "blue",
    paddingHorizontal: 20,
  },
  JoinGroupButton: {
    marginTop: 16,
    backgroundColor: "#3679A4",
    borderRadius: 4,
    paddingVertical: 12,
  },
  CreateGroupButton: {
    marginTop: 16,
    backgroundColor: "#ffffff",
    borderColor: "#3679A4",
    borderRadius: 4,
    paddingVertical: 12,
    borderWidth: 1,
  },
  JoinGroupButtonText: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 18,
  },
  CreateGroupButtonText: {
    textAlign: "center",
    color: "#3679A4",
    fontSize: 18,
  },
});

export default GroupScreen;