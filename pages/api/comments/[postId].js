import { addDoc, collection } from "@firebase/firestore";
import { db } from "../../../firebase/firebase";

export default async function handler(req, res) {
  const { postId } = req.query;
  if (req.method === "POST") {
    const comment = req.body;
    try {
      await addDoc(collection(db, `posts/${postId}/comments`), comment);
      res.status(200).json("success");
    } catch (err) {
      res.status(404).end();
    }
  }
}
