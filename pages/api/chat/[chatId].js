import { addDoc, collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "../../../firebase/firebase";

export default async function handler(req, res) {
  const { chatId } = req.query;
  const message = req.body;
  if (req.method === "POST") {
    try {
      await addDoc(collection(db, `chat/${chatId}/messages`), message);
      res.status(200).json("success");
    } catch (err) {
      res.status(402).end();
    }
  }
}
