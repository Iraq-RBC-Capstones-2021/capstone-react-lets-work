import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { db } from "../../../firebase/firebase";

export default async function handler(req, res) {
  const { userId } = req.query;
  if (req.method === "GET") {
    try {
      const docSnap = (await getDoc(doc(db, "users", userId))).data();
      res.status(200).json(docSnap);
    } catch (err) {
      res.status(400).end();
    }
  }
  if (req.method === "PUT") {
    const updatedValues = req.body;
    try {
      await updateDoc(doc(db, "users", userId), {
        ...updatedValues,
      });
      res.status(200).json("Successfully updated");
    } catch (err) {
      res.status(400).end();
    }
  }
}
