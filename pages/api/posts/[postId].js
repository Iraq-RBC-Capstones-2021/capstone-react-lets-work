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
      console.log(comments);
      res.status(200).json("deleted successfully");
    } catch (err) {
      console.log(err);
      res.status(402).end();
    }
  }
  // if (req.method === "GET") {
  //   try {
  //     const data = (await getDoc(doc(db, "posts", post))).data();
  //     res.status(200).json(data);
  //   } catch (err) {
  //     res.status(404).end();
  //   }
  // }
  // if (req.method === "PUT") {
  //   const newPost = req.body;
  //   try {
  //     await updateDoc(doc(db, "posts", post), {
  //       title: newPost.title,
  //       description: newPost.description,
  //       image: newPost.image,
  //     });
  //     res.status(200).json("successfully edited");
  //   } catch (err) {
  //     res.status(404).end();
  //   }
  // }
}
