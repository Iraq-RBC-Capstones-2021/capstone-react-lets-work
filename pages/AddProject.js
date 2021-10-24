import { useTranslation } from "next-i18next";
import {
  Box,
  Heading,
  Input,
  HStack,
  Stack,
  Button,
  VStack,
  IconButton,
  Text,
  Wrap,
  WrapItem,
  Tooltip,
  Popover,
  PopoverContent,
  PopoverCloseButton,
  PopoverTrigger,
  PopoverBody,
  PopoverArrow,
  Image as ChakraImage,
} from "@chakra-ui/react";
import { FiSend, FiImage } from "react-icons/fi";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import React from "react";
import ChakraInput from "../components/Shared/ChakraInput";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { auth, storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { useDispatch } from "react-redux";
import { submitPost } from "../store/posts/postsSlice";

export default function AddProject() {
  const dispatch = useDispatch();

  const [tagsArray, setTagsArray] = useState([]);
  const [tagsValue, setTagsValue] = useState("");
  const [imageURL, setImageURL] = useState("");

  const handleTagsArray = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (
        tagsArray.length < 3 &&
        tagsValue.trim().length < 10 &&
        tagsValue.trim().length > 2
      ) {
        setTagsValue("");
        setTagsArray((prev) => [...prev, e.target.value]);
      }
    }
  };
  function handleTags() {
    if (
      tagsArray.length < 3 &&
      tagsValue.trim().length < 10 &&
      tagsValue.trim().length > 2
    ) {
      setTagsValue("");
      setTagsArray((prev) => [...prev, tagsValue]);
    }
  }
  const [imageFileState, setImageFileState] = useState({
    file: null,
    imageUploadError: null,
  });
  const uploadInput = useRef();
  const { t } = useTranslation("setting");

  function openFileUpload() {
    uploadInput.current.click();
  }
  const onChangeFile = (event) => {
    const imageFile = event.target.files[0];

    if (!imageFile) {
      return;
    }

    if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
      setImageFileState({
        imageUploadError: "Only jpg/jpeg/png extentions are allowed.",
      });
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = (image) => {
      const img = new Image();
      img.onload = () => {
        setImageFileState({ file: imageFile, imageUploadError: undefined });
        const storageRef = ref(storage, `images/${imageFile.name}`);

        const uploadImage = uploadBytesResumable(storageRef, imageFile);

        uploadImage.on(
          "state_changed",
          (snapshot) => {},
          (error) => {},
          () => {
            getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {
              setImageURL(downloadURL);
            });
          }
        );
      };
      img.onerror = () => {
        setImageFileState({ imageUploadError: "Invalid image content." });
        return false;
      };
      img.src = image.target.result;
    };
    fileReader.readAsDataURL(imageFile);
  };
  const onSubmit = (value, onSubmitProps) => {
    const postData = {
      imageURL,
      tags: tagsArray,
      title: value.projectName,
      description: value.description,
      userId: auth.currentUser?.uid,
    };
    dispatch(submitPost(postData));
    setTagsArray([]);
    setImageURL("");
    onSubmitProps.resetForm();
  };
  return (
    <Formik
      initialValues={{ projectName: "", description: "", tags: "" }}
      validationSchema={Yup.object({
        projectName: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        description: Yup.string()
          .max(200, "Must be 200 characters or less")
          .required("Required"),
      })}
      onSubmit={onSubmit}
    >
      <Form>
        <Stack
          align="center"
          justify="center"
          bg="secondary.main"
          height="70vh"
        >
          <Box
            mx={{ base: "3" }}
            bg="white"
            color="blue.300"
            borderRadius="xl"
            p={["5", "6", "8"]}
            h={{ base: "100%", md: "auto" }}
            w={{ md: "40rem", base: "100%" }}
          >
            <Stack spacing={3}>
              <VStack
                alignContent="space-evenly"
                align="flex-start"
                justify="flex-start"
              >
                <Heading
                  as="h5"
                  fontSize={{ base: "22px", md: "18px" }}
                  color="black"
                >
                  New Project/idea
                </Heading>
                <ChakraInput
                  placeholder="Project name"
                  variant="flushed"
                  color="blue.500"
                  fontSize={{ base: "18px", md: "15px" }}
                  name="projectName"
                  w="100%"
                />
                <ChakraInput
                  placeholder="Description"
                  variant="flushed"
                  fontSize={{ base: "18px", md: "15px" }}
                  name="description"
                  w="100%"
                />
              </VStack>
              <VStack align="flex-start" justify="flex-start">
                <HStack>
                  <Heading
                    as="h5"
                    fontSize={{ base: "22px", md: "18px" }}
                    color="black"
                  >
                    Tags
                  </Heading>
                  <Popover isLazy>
                    <PopoverTrigger>
                      <InfoOutlineIcon />
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverCloseButton />
                      <PopoverArrow />
                      <PopoverBody>
                        Press Enter to add a tag, You cant add more than 3 tags
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </HStack>

                <HStack wrap="wrap" spacing={3} flexShrink={0}>
                  <Box
                    w={["18rem", "35rem"]}
                    minH="4vw"
                    borderWidth="1px"
                    rounded="7"
                    p="2"
                  >
                    <Wrap>
                      {tagsArray.map((tag) => (
                        <WrapItem key={uuidv4()}>
                          <Button
                            type="button"
                            size="sm"
                            bgColor="blue.100"
                            rounded="100"
                            m="1"
                            onClick={() => {
                              const newtags = tagsArray.filter(
                                (t) => t !== tag
                              );
                              setTagsArray(newtags);
                            }}
                          >
                            {tag}
                          </Button>
                        </WrapItem>
                      ))}
                      <WrapItem>
                        <Input
                          placeholder={t("Press Enter to add the tag")}
                          name="interests"
                          variant="ghost"
                          onKeyDown={handleTagsArray}
                          value={tagsValue}
                          onChange={(e) => {
                            setTagsValue(e.target.value);
                          }}
                        />
                      </WrapItem>
                      <WrapItem>
                        <Button onClick={handleTags} display={{ lg: "none" }}>
                          Add Tag
                        </Button>
                      </WrapItem>
                    </Wrap>
                  </Box>
                </HStack>
                {imageURL && (
                  <ChakraImage src={imageURL} boxSize="3rem" alt="img" />
                )}
              </VStack>

              <Stack isInline spacing={2} wrap="wrap">
                <Input
                  hidden
                  ref={uploadInput}
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={onChangeFile}
                />
                <IconButton icon={<FiImage />} onClick={openFileUpload}>
                  {t("uploadNewPhoto")}
                </IconButton>
                <IconButton icon={<FiSend />} type="submit" />
              </Stack>
              {imageFileState.file === undefined ? (
                <Text color="red.400">{imageFileState.imageUploadError}</Text>
              ) : null}
            </Stack>
          </Box>
        </Stack>
      </Form>
    </Formik>
  );
}
