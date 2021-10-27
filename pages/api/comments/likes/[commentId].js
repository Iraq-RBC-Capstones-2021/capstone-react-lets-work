import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  increment,
  updateDoc,
} from "@firebase/firestore";
import { db } from "../../../../firebase/firebase";

export default async function handler(req, res) {
  const { commentId } = req.query;
  const { userId, postId } = req.body;
  if (req.method === "POST") {
    try {
      const currentComment = await (
        await getDoc(doc(db, `posts/${postId}/comments`, commentId))
      ).data();
      console.log(currentComment);
      if (!currentComment.likes.includes(userId)) {
        await updateDoc(doc(db, `posts/${postId}/comments`, commentId), {
          likes: arrayUnion(userId),
        });
        res.status(200).json("success");
      } else {
        await updateDoc(doc(db, `posts/${postId}/comments`, commentId), {
          likes: arrayRemove(userId),
        });
        res.status(200).json("success");
      }
    } catch (err) {
      console.log(err);
      res.status(404).end();
    }
  }
}
