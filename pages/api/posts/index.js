import { addDoc, collection } from "@firebase/firestore";
import { db } from "../../firebase/firebase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const postData = req.body;
    try {
      await addDoc(collection(db, "posts"), {
        ...postData,
        createdAt: new Date(),
        likes: [],
        likesCount: [],
        users: [],
      });
      res.status(200);
    } catch (err) {
      res.status(404).end();
    }
  }
}
