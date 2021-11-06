import { addDoc, collection, doc, setDoc } from "@firebase/firestore";
import { db } from "../../../firebase/firebase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const postData = req.body;
    try {
      await addDoc(collection(db, "posts"), {
        ...postData,
        createdAt: new Date(),
        likes: [],
        likesCount: 0,
        users: [],
      }).then((post) => {
        setDoc(doc(db, "chat", post.id), {
          users: [postData.userId],
          type: "group",
          title: postData.title,
          imageURL: postData.imageURL,
        });
        res.status(200).json(post.id);
      });
    } catch (err) {
      res.status(404).end();
    }
  }
}
