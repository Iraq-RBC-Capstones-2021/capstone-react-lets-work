import {
  Heading,
  Stack,
  Box,
  Text,
  Avatar,
  VStack,
  Button,
  IconButton,
  Link,
  Flex,
} from "@chakra-ui/react";
import { SiGmail, SiInstagram, SiFacebook, SiLinkedin } from "react-icons/si";

function TopSection({
  username,
  bio,
  job,
  about,
  email,
  instagram,
  facebook,
  linkedIn,
  interests,
  skills_hobbies,
  imageURL,
}) {
  console.log(imageURL);
  return (
    <Stack>
      <Flex
        justify="space-between"
        direction={["column", "column", "row", "row"]}
        align={{ base: "flex-start", md: "center" }}
      >
        <Box px={["50px", "80px", "150px"]} py={["15px", "30px", "30px"]}>
          <Flex
            direction={["column", "column", "row", "row"]}
            justify="space-around"
            align={{ base: "flex-start", md: "center" }}
          >
            <Avatar size="2xl" src={imageURL ? imageURL : ""} />

            <Stack mx={["15", "7"]}>
              <Heading fontSize={{ base: "25px", md: "27px" }}>
                {username}
              </Heading>
              <Text color="gray.500" fontWeight="light">
                {" "}
                {job}
              </Text>
              <Flex align="center">
                <IconButton as={Link} href={email} icon={<SiGmail />} />
                <IconButton as={Link} href={instagram} icon={<SiInstagram />} />
                <IconButton as={Link} href={facebook} icon={<SiFacebook />} />
                <IconButton as={Link} href={linkedIn} icon={<SiLinkedin />} />
              </Flex>
              <Text color="gray.500" fontWeight="light">
                {" "}
                {bio}
              </Text>
              <VStack align="flex-start">
                <Button variant="primary">Message</Button>
              </VStack>
            </Stack>
          </Flex>
        </Box>
      </Flex>
      <Flex
        direction={["column", "column", "row", "row"]}
        align={{ base: "flex-start", md: "center" }}
        bg="white"
      >
        <Box px={["50px", "100px", "150px"]} paddingY="30px" bg="white">
          <Heading paddingBottom="20px" fontSize={{ base: "25px", md: "27px" }}>
            Interests
          </Heading>
          <Flex wrap="wrap">{interests}</Flex>
        </Box>
      </Flex>
      <Flex
        direction={["column", "column", "row", "row"]}
        align={{ base: "flex-start", md: "flex-start" }}
        bg="white"
      >
        <Box px={["50px", "100px", "150px"]} py="20px" spacing={25} bg="white">
          <Heading paddingBottom="20px" fontSize={{ base: "25px", md: "27px" }}>
            About
          </Heading>
          <Text>{about}</Text>
        </Box>
      </Flex>
      <Flex
        direction={["column", "column", "row", "row"]}
        align={{ base: "flex-start", md: "flex-start" }}
        bg="secondary.main"
      >
        <Box px={["50px", "100px", "150px"]} py="35px">
          <Heading paddingBottom="20px" fontSize={{ base: "25px", md: "27px" }}>
            Skills & Hobbies
          </Heading>
          {skills_hobbies}
        </Box>
      </Flex>
    </Stack>
  );
}

export default TopSection;
