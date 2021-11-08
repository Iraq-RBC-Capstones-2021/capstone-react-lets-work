import { Heading, Stack, Text, Image, Center } from "@chakra-ui/react";
import NextImage from "next/image";

const Feature = ({ imageSrc, alt, title, textContent }) => {
  return (
    <Stack textAlign="center">
      <Center>
        <Image
          as={NextImage}
          src={imageSrc}
          width="280px"
          alt={alt}
          height="243px"
          mt="0"
        />
      </Center>
      <Heading
        fontWeight={400}
        fontSize={{ base: "24px", sm: "26px", md: "28px" }}
      >
        {title}
      </Heading>
      <Center>
        <Text
          color="#000"
          fontSize="18px"
          fontWeight="400"
          textAlign="center"
          mt="1rem"
          lineHeight="140%"
        >
          {textContent}
        </Text>
      </Center>
    </Stack>
  );
};

export default Feature;
