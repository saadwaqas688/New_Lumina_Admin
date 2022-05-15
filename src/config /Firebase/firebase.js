import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCvZ1BJKcNUAGLnzc9sBYCsQATLyfoLl10",
    authDomain: "lumina-5d91c.firebaseapp.com",
    projectId: "lumina-5d91c",
    storageBucket: "lumina-5d91c.appspot.com",
    messagingSenderId: "177925983567",
    appId: "1:177925983567:web:c2f014e8ed4db29484493a"
  };
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// const firebaseConfig = {
//   apiKey: "AIzaSyDHJ0K8WZrrRkKCfc47cFtjCZOHVFSHZ-g",
//   authDomain: "task-bdbaf.firebaseapp.com",
//   projectId: "task-bdbaf",
//   storageBucket: "task-bdbaf.appspot.com",
//   messagingSenderId: "406487100630",
//   appId: "1:406487100630:web:ddd10f8ca29178ae8fed77"
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth();
// export const db = getFirestore(app);
// export const storage = getStorage(app);

