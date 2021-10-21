import { useEffect, useState } from "react";

const useImageValidation = (originalUpload) => {
  const [imageFileState, setImageFileState] = useState({
    file: null,
    imageUploadError: null,
  });

  useEffect(() => {
    if (!originalUpload) {
      return;
    }

    if (!originalUpload.name.match(/\.(jpg|jpeg|png)$/)) {
      setImageFileState({
        imageUploadError: "Only jpg/jpeg/png extentions are allowed.",
      });
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = (image) => {
      const img = new Image();
      img.onload = () => {
        setImageFileState({
          file: originalUpload,
          imageUploadError: undefined,
        });
      };
      img.onerror = () => {
        setImageFileState({ imageUploadError: "Invalid image content." });
        return false;
      };
      img.src = image.target.result;
    };
    fileReader.readAsDataURL(originalUpload);
  }, [originalUpload]);

  return imageFileState;
};

export { useImageValidation };
