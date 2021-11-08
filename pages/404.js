import {
  SimpleGrid,
  Box,
  Image,
  Center,
  VStack,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import NextImage from "next/image";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/dist/client/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter as router } from "next/dist/client/router";
import NextLink from "next/link";

const Custom404 = () => {
  const { t } = useTranslation("404");
  const { locale } = useRouter();

  return (
    <Center py={28}>
      <Flex
        direction={{ base: "column", lg: "row" }}
        dir={router().locale === "ar" ? "rtl" : "ltr"}
        align="center"
      >
        <Image
          flex="1"
          as={NextImage}
          src="images/404.svg"
          width={{ base: "24rem", lg: "429px" }}
          alt="404"
          mr={{ base: 0, lg: 24 }}
        />

        <VStack
          flex="1"
          spacing={8}
          align={{ lg: "left" }}
          px={{ base: 16, lg: 0 }}
        >
          <Text
            color="primary.main"
            fontSize={{ base: 48, lg: 52 }}
            fontWeight={600}
          >
            {t("oops")}
          </Text>
          <Text fontSize={{ base: 26, lg: 32 }}>{t("text")}</Text>
          <NextLink href="/" passHref>
            <Button
              fontSize={{ base: 20, lg: 24 }}
              color="secondary.lighter"
              bg="primary.main"
              rounded="25px"
              width={{ base: "180px", lg: "220px" }}
              px={6}
              py={6}
              _hover={{
                bg: "primary.lighter",
              }}
            >
              {t("button")}
            </Button>
          </NextLink>
        </VStack>
      </Flex>
    </Center>
  );
};

export default Custom404;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["404", "navbar"])),
    },
  };
}
