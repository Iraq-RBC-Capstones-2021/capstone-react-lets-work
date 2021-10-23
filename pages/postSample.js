import { Box } from "@chakra-ui/react";
import Comment from "../components/Comment";
import React from "react";

function postSample() {
  const sampleComment = [
    {
      id: "1",
      name: "Olivia RIo",
      src: "https://bit.ly/dan-abramov",
      content:
        "Hi this is olivia I wanna join this project it looks great looking forward to get this chance",
      likes: "56",
    },
    {
      id: "2",
      name: "Segun Adebayo",
      src: "https://bit.ly/sage-adebayo",
      content: "That is great",
      likes: "53",
    },
    {
      id: "3",
      name: "Ryan Florence",
      src: "https://bit.ly/ryan-florence",
      content: "lets do this",
      likes: "54",
    },
    {
      id: "4",
      name: "Kent Dodds",
      src: "https://bit.ly/kent-c-dodds",
      content:
        "That is great how you can do this this bull shit i hate you hate kots og=f harte",
      likes: "10",
    },
  ];
  return (
    <Box
      w={["100%", "100%", "100%", "50%"]}
      p={3}
      m={5}
      rounded="xl"
      border-radius="19px"
    >
      {" "}
      {sampleComment.map((comment) => {
        return <Comment key={comment.id} sampleComment={comment} />;
      })}
    </Box>
  );
}

export default postSample;
