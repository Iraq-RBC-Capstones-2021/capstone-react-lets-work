//How To Use?
// call the hook with the file uploaded passed to it as a first parameter
// then the hook returns an object that contain two variable similar to this:
// {file: <image file>, imageUploadError:<error string>}
// if the validation is successful the object will contain the file and imageUploadError will be undefined
// if the validation has failed the object's imageUploadError will contain the error and file will be undefined

import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

const useImageValidation = (originalUpload) => {
  const { t } = useTranslation("useImageValidation");

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
        imageUploadError: t("extentionRestriction"),
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
          imageUploadSuccess: t("successfullUpload"),
        });
      };
      img.onerror = () => {
        setImageFileState({ imageUploadError: t("invalidType") });
        return false;
      };
      img.src = image.target.result;
    };
    fileReader.readAsDataURL(originalUpload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalUpload]);

  return imageFileState;
};

export { useImageValidation };
