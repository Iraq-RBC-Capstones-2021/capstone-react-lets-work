import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
  SimpleGrid,
  Image,
  Center,
} from "@chakra-ui/react";
import { Image as NextImage } from "next/image";
import Feature from "../../components/About/Feature";

export default function About() {
  return (
    <div>
      <Stack
        bg="secondary.main"
        py={{ base: 8, md: 16 }}
        px="10px"
        textAlign="center"
      >
        <Heading
          fontWeight={700}
          fontSize={{ base: "30px", sm: "40px", md: "50px" }}
          lineHeight="70px"
        >
          What is Let&apos;s Work?
        </Heading>
        <Center>
          <Text
            color="#000"
            maxW="600px"
            fontSize="24px"
            fontWeight="400"
            textAlign="center"
            mt="2rem"
            lineHeight="140%"
          >
            Let’s work is a platform to share project ideas across people and
            get them to cooperate together and work on them to make them come
            true
          </Text>
        </Center>
        <Center>
          <Image
            as={NextImage}
            src="images/Goodteam.svg"
            width={{ sm: "24rem", lg: "429px" }}
            alt="goodteambro"
            height={{ sm: "24rem", lg: "429px" }}
            mt="0"
          />
        </Center>
      </Stack>

      <Stack
        flexDirection={{ base: "column", md: "row" }}
        py={{ base: 8, md: 16 }}
        justifyContent="center"
        alignItems="center"
      >
        <Stack>
          <Image
            as={NextImage}
            src="images/Team-amico 1.svg"
            width={{ base: "24rem", lg: "429px" }}
            alt="goodteambro"
            height={{ base: "24rem", lg: "429px" }}
            mt="0"
          />
        </Stack>
        <Container>
          <Stack>
            <Heading
              fontWeight={700}
              fontSize={{ base: "30px", sm: "40px", md: "50px" }}
              lineHeight="70px"
              textAlign="center"
            >
              Great discussion experience
            </Heading>
            <Center>
              <Text
                color="#000"
                maxW="600px"
                fontSize="24px"
                fontWeight="400"
                textAlign="center"
                mt="2rem"
                lineHeight="140%"
              >
                Clean and easy to handle discussion form to make sure our users
                are having a great discussion experience about their favourite
                topics!
              </Text>
            </Center>
          </Stack>
        </Container>
      </Stack>

      <Stack
        bg="secondary.main"
        py={{ base: 8, md: 16 }}
        px={8}
        textAlign="center"
      >
        <Heading
          fontWeight={700}
          fontSize={{ base: "30px", sm: "40px", md: "50px" }}
          lineHeight="70px"
          mb={8}
        >
          Why You Should Join Us?
        </Heading>
        <Box p={4}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={16}>
            <Feature
              imageSrc="images/innovative.svg"
              alt="feature1"
              title="Easy to use"
              textContent="Sign in and  instantly start working on your project!"
            />
            <Feature
              imageSrc="images/startup.svg"
              alt="feature2"
              title="Share your Idea"
              textContent="Work with people interested in your idea"
            />
            <Feature
              imageSrc="images/Information flow_Monochromatic.svg"
              alt="feature3"
              title="Find ideas"
              textContent="Search for ideas regarding all topics"
            />
            <Feature
              imageSrc="images/web.svg"
              alt="feature4"
              title="Easy communication"
              textContent="Stay in touch with your project members via group chats"
            />
          </SimpleGrid>
        </Box>
      </Stack>
    </div>
  );
}
