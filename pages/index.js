import styles from "../styles/Home.module.css";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";

export default function Home() {
  return (
    <div className={styles.app}>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"start"}
          spacing={{ base: 8, md: 8 }}
          py={{ base: 10, md: 24 }}
        >
          <Heading
            fontWeight={800}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"70%"}
            color={"primary.main"}
          >
            Let's Work
            <Text as={"span"} color={"tertiary.darker"}>
              {" "}
              on a Project!
            </Text>
          </Heading>
          <Text
            color={"#455A64"}
            fontSize={{ base: "1xl", sm: "1xl", md: "2xl" }}
            fontWeight={600}
            align={"start"}
            alignSelf={"start"}
            pr={"36"}
          >
            A platform where you can find Projects, Ideas, and People with the
            same interest as you.
          </Text>
          <Stack
            direction={"column"}
            align={"start"}
            alignSelf={"start"}
            position={"relative"}
          >
            <Button
              fontSize={{ base: "1xl", sm: "1xl", md: "2xl" }}
              color={"secondary.lighter"}
              bg={"primary.main"}
              rounded={"15px"}
              px={12}
              py={6}
              size="md"
              _hover={{
                bg: "primary.lighter",
              }}
            >
              Join us
            </Button>
          </Stack>
        </Stack>
      </Container>
      <Container maxW={"5xl"}>
        <Box px={0}>
          <SimpleGrid columns={{ base: 3 }} spacing={16}>
            <Center>
              <img src="images/womanvectorpaint.svg" />
            </Center>

            <Center>
              <img src="images/Team-amico 1.svg" style={{ height: "250px" }} />
            </Center>

            <Center>
              <img
                src="images/jobhuntvectorpaint.svg"
                style={{ height: "250px" }}
              />
            </Center>
          </SimpleGrid>
        </Box>
      </Container>
    </div>
  );
}
