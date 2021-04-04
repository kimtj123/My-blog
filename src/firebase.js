import firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from "./firebase.conf.json"

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();
// firestore.settings({ timestampsInSnapshots: true });

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore };