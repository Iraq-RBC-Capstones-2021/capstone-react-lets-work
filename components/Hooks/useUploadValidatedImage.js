import { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const useUploadValidatedImage = (validatedImage) => {
  const [imageURL, serImageURL] = useState("");

  useEffect(() => {
    if (validatedImage.file) {
      const storageRef = ref(
        getStorage(),
        `images/${validatedImage.file.name}`
      );

      const uploadImage = uploadBytesResumable(storageRef, validatedImage.file);
      uploadImage.on(
        "state_changed",
        (snapshot) => {},
        (error) => {},
        () => {
          getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {
            serImageURL(downloadURL);
          });
        }
      );
    }
  }, [validatedImage]);

  return imageURL;
};

export { useUploadValidatedImage };
