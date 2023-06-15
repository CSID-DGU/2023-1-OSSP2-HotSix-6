
# 2023-1-OSSP2-HotSix-6

2023년, 1학기, 공개SW프로젝트, 02분반, 핫식스, 6조

## 📅프로젝트명

WORKAHALLIC - 시간표를 활용한 대학생 일정 관리 앱

## 🙋팀원

### Front-End

| 이름 | 전공 | 학번 | 비고 |
| --- | --- | --- | --- |
| 황현정 | 컴퓨터공학전공 | 2020 | 팀장 |
| 송하연 | 컴퓨터공학전공 | 2021111945 |  |
| 여은동 | 컴퓨터공학전공 | 2019111981 |  |

### Back-End

| 이름 | 전공 | 학번 | 비고 |
| --- | --- | --- | --- |
| 남상원 | 컴퓨터공학전공 | 2019111985 |  |
| 오수현 | 컴퓨터공학전공 | 2021111991 |  |

## ✔️배경

- 대학생들의 팀 프로젝트, 직장인들의 협업 등에서 일정 관리는 필수로 여겨지고 있다. 특히 수업 시간 및 업무 시간을 제외하고 진행하는 공모전, 사이드 프로젝트 등의 경우 팀원 모두의 일정을 고려하여 협업이 가능한 시간을 추출해야 한다.
- 대학생이 가장 많이 사용하는 에브리타임의 시간표 이미지를 기본 입력으로 받고, 확장성을 위해 구글 캘린더의 ics 파일 또한 입력으로 사용한다.
- 협업을 위해 그룹을 생성하면 개인이 입력한 시간표를 사용하여 공강을 추출하고 자동으로 그룹의 공통 시간표를 생성한다. 다른 시간표와 달리 일정이 없는 공강이 시간표의 주요 사항이 된다.
- 그룹에 입장하면 협업을 위한 기능이 제공된다. 공지사항, 개인 업무, 프로젝트 세부 목표 등의 기능을 활용하여 협업을 진행할 수 있다.

## ⚙️개발 환경


<div align=center>

  <img src="https://img.shields.io/badge/vscode-007ACCs?style=for-the-badge&logo=vscode&logoColor=green">
  <img src="https://img.shields.io/badge/Expo-yellow?style=for-the-badge&logo=iTerms2&logoColor=white">
   <img src="https://img.shields.io/badge/avd manager-007ACC?style=for-the-badge&logo=vscode&logoColor=white">
  <img src="https://img.shields.io/badge/android studio-purple?style=for-the-badge&logo=iTerms2&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/restApi-navy?style=for-the-badge&logoColor=white">

![](https://img.shields.io/badge/Django-4.1.9-pink?style=for-the-badge&logo=appveyor?logo=null)
![](https://img.shields.io/badge/Python-3.11.4-blue?style=for-the-badge&logo=appveyor?logo=null)
![](https://img.shields.io/badge/Mysql-8.0.31-green?style=for-the-badge&logo=appveyor?logo=null)
![](https://img.shields.io/badge/jdk-20.0.1-blue?style=for-the-badge&logo=appveyor?logo=null)
![](https://img.shields.io/badge/Node.js-18.16.0-green?style=for-the-badge&logo=appveyor?logo=null)
</div>


- Front-End

```markdown
npm install —global expo-cli //download expo
npm doctor //checking npm for start npm
npm start //starting project
```

## 📚라이브러리 (필요한 부분만 작성)

- react-native-picker
- expo-image-picker
- expo-location
- axios
- react-native-paper
- react-native-timetable
- react-navigation/bottom-tabs
- expo-file-system
- react-native-modal
- react-native-vector
- jwt
- bcrypt
- datetime
- zlib
- OpenCV
- https://github.com/ecsimsw/gap-between-classes






## 📱기능 설명


⭐시간표

<br>
<img width="30%" height="510"  src="https://github.com/CSID-DGU/2023-1-OSSP2-HotSix-6/assets/102026726/16385bb5-bd13-48b6-9d44-f2b3c635ef56"/>
<img width="30%" height="510"  src="https://github.com/CSID-DGU/2023-1-OSSP2-HotSix-6/assets/102026726/228cc074-a0d7-484a-ac77-b9edbc6e030f"/>
<img width="30%" height="510"  src="https://github.com/CSID-DGU/2023-1-OSSP2-HotSix-6/assets/102026726/b3e74718-0c69-4437-b029-7ba27425fe22"/>

<br>

- 에브리타임 시간표 이미지 or 구글캘린더.ics파일로 개인 시간표 입력
- 시간표 시작 시간 입력
- 개인 공강 시간 중 선호하는 공강 시간 클릭
- 그룹 생성 시 팀원 시간표 자동 통합
- 그룹 공통 공강 시간표 추출

<br>

⭐그룹 세부페이지

<br>
<img width="30%" height="510"  src="https://github.com/CSID-DGU/2023-1-OSSP2-HotSix-6/assets/102026726/31a23765-cafa-41f3-9b1a-4284eee8d706"/>
<img width="30%" height="510"  src="https://github.com/CSID-DGU/2023-1-OSSP2-HotSix-6/assets/102026726/24f20905-671d-4751-940a-3a79e26b97d5"/>
<img width="30%" height="510"  src="https://github.com/CSID-DGU/2023-1-OSSP2-HotSix-6/assets/102026726/06320958-d01c-4b4d-8545-575f0dbf4f57"/>

<br>

- 그룹 공지사항
- 그룹 내 팀원 업무 분담
- 프로젝트 세부 목표 설정
- 전체 진행 상황 파악

## 데모

(영상)