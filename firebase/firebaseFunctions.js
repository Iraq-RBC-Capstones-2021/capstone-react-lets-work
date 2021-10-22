import db from "./firebase";
import { addDoc, collection } from "@firebase/firestore";

export const addPostToFirebase = async (postData) => {
  const collectionRef = collection(db, "posts");
  const payload = postData;
  await addDoc(collectionRef, payload);
};
