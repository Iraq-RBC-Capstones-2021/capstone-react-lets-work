import {
  SimpleGrid,
  Box,
  Image,
  Center,
  VStack,
  Text,
  Button,
} from "@chakra-ui/react";
import { Image as NextImage } from "next/image";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/dist/client/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter as router } from "next/dist/client/router";

const Custom404 = () => {
  const { t } = useTranslation("404");
  const { locale } = useRouter();

  return (
    <Center>
      <SimpleGrid
        columns={2}
        my={4}
        spacing={16}
        dir={router().locale === "ar" ? "rtl" : "ltr"}
      >
        <Box>
          <Center>
            <Image
              as={NextImage}
              src="images/404.svg"
              width={{ base: "24rem", lg: "429px" }}
              alt="404"
            />
          </Center>
        </Box>
        <Box pt={16} width="80%">
          <VStack spacing={8} align="left">
            <Box>
              <Text color="primary.main" fontSize={44} fontWeight={600}>
                {t("oops")}
              </Text>
            </Box>
            <Box>
              <Text fontSize={24}>{t("text")}</Text>
            </Box>
            <Box>
              <Button
                fontSize={{ base: "1xl", sm: "1xl", md: "1xl" }}
                color="secondary.lighter"
                bg="primary.main"
                rounded="20px"
                px={8}
                py={4}
                size="md"
                _hover={{
                  bg: "primary.lighter",
                }}
              >
                {t("button")}
              </Button>
            </Box>
          </VStack>
        </Box>
      </SimpleGrid>
    </Center>
  );
};

export default Custom404;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["404"])),
    },
  };
}
