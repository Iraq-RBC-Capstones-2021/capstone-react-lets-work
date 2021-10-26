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
  const { postId } = req.query;
  const { userId } = req.body;

  if (req.method === "POST") {
    try {
      const currentPost = await (await getDoc(doc(db, "posts", postId))).data();
      if (!currentPost.likes.includes(userId)) {
        await updateDoc(doc(db, "posts", postId), {
          likes: arrayUnion(userId),
          likesCount: increment(1),
        });
        res.status(200).json("success");
      } else {
        await updateDoc(doc(db, "posts", postId), {
          likes: arrayRemove(userId),
          likesCount: increment(-1),
        });

        res.status(200).json("success");
      }
    } catch (err) {
      res.status(404).end();
    }
  }
}
