import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  SimpleGrid,
  Center,
  Image,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/dist/client/router";
import NextImage from "next/image";
import NextLink from "next/link";
import { auth } from "../../firebase/firebase";

export default function TopSection() {
  const { t } = useTranslation("home");
  const router = useRouter();

  return (
    <div dir={router.locale === "ar" ? "rtl" : "ltr"}>
      <Container maxW="3xl">
        <Stack
          as={Box}
          textAlign={{ base: "center", md: "start" }}
          spacing={{ base: 8, md: 8 }}
          py={{ base: 10, md: 24 }}
        >
          <Heading
            fontWeight={800}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight="70%"
            color="primary.main"
          >
            {t("brand")}
            <Text as="span" color={"tertiary.darker"}>
              {" "}
              {t("heading")}
            </Text>
          </Heading>
          <Text
            color="#455A64"
            fontSize={{ base: "1xl", sm: "1xl", md: "2xl" }}
            fontWeight={600}
            align={{ base: "center", md: "start" }}
            pr={{ base: 0, md: 36 }}
            px={{ base: 10, md: 0 }}
          >
            {t("description")}
          </Text>
          <Stack
            direction="column"
            align="start"
            alignSelf={{ base: "center", md: "start" }}
            position="reladdpative"
          >
            {auth.currentUser ? (
              <NextLink passHref href="/AddProject">
                <Button
                  fontSize={{ base: "1xl", sm: "1xl", md: "2xl" }}
                  color="secondary.lighter"
                  bg="primary.main"
                  rounded="15px"
                  px={12}
                  py={6}
                  size="md"
                  _hover={{
                    bg: "primary.lighter",
                  }}
                >
                  {t("add")}
                </Button>
              </NextLink>
            ) : (
              <NextLink passHref href="/signup">
                <Button
                  fontSize={{ base: "1xl", sm: "1xl", md: "2xl" }}
                  color="secondary.lighter"
                  bg="primary.main"
                  rounded="15px"
                  px={12}
                  py={6}
                  size="md"
                  _hover={{
                    bg: "primary.lighter",
                  }}
                >
                  {t("join_us")}
                </Button>
              </NextLink>
            )}
          </Stack>
        </Stack>
      </Container>
      <Container maxW="5xl">
        <Box px={0}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={16}>
            <Center>
              <Image
                as={NextImage}
                src="/images/womanvectorpaint.svg"
                height={251.37}
                width={318}
                alt="businesswoman"
              />
            </Center>

            <Center>
              <Image
                as={NextImage}
                src="/images/Team-amico 1.svg"
                height={251.37}
                width={318}
                alt="team"
                display={{ base: "none", md: "block" }}
              />
            </Center>

            <Center>
              <Image
                as={NextImage}
                src="/images/jobhuntvectorpaint.svg"
                height={251.37}
                width={318}
                alt="jobhunt"
                display={{ base: "none", md: "block" }}
              />
            </Center>
          </SimpleGrid>
        </Box>
      </Container>
    </div>
  );
}
