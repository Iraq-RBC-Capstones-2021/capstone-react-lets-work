import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { auth, db } from "../../../firebase/firebase";

export default async function handler(req, res) {
  const user = req.body;
  if (req.method === "POST") {
    try {
      await setDoc(doc(db, "users", user.id), {
        email: user.email,
        id: user.id,
        username: user.username,
        isOnline: true,
        createdAt: new Date(),
        bio: "",
        about: "",
        interests: [],
        skills_hobbies: "",
        name: user.username,
        likedPosts: [],
        social: {
          facebook: "",
          linkedIn: "",
          instagram: "",
          youtube: "",
        },
        imageURL: user.imageURL,
      });
      res.status(200).json("Successfully Signed Up");
    } catch (err) {
      res.status(400).end();
    }
  }
}
