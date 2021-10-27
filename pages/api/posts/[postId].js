import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "@firebase/firestore";
import { db } from "../../../firebase/firebase";

export default async function handler(req, res) {
  const { postId } = req.query;
  if (req.method === "DELETE") {
    try {
      await deleteDoc(doc(db, "posts", postId));
      const comments = (
        await getDocs(collection(db, `posts/${postId}/comments`))
      ).docs.map((d) => d.id);

      comments?.forEach(async (comment) => {
        await deleteDoc(doc(db, `posts/${postId}/comments`, comment));
      });
      res.status(200).json("deleted successfully");
    } catch (err) {
      res.status(402).end();
    }
  }

  if (req.method === "PUT") {
    const post = req.body;
    try {
      await updateDoc(doc(db, "posts", postId), {
        title: post.title,
        description: post.description,
        imageURL: post.imageURL,
        tags: post.tags,
      });
      res.status(200).json("successfully edited");
    } catch (err) {
      res.status(404).end();
    }
  }
}
