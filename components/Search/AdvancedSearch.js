import {
  Center,
  Text,
  Select,
  Input,
  Grid,
  GridItem,
  PopoverBody,
  FormControl,
  Divider,
  Button,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/dist/client/router";

const AdvancedSearch = () => {
  const { t } = useTranslation("search");
  const { locale } = useRouter();

  return (
    <PopoverBody dir={locale === "ar" ? "ltr" : "rtl"}>
      <FormControl id="country">
        <Text mt={4} fontWeight="bold" fontSize="xl">
          {t("search_fields")}
        </Text>
        <Divider mb={4} />

        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(6, 1fr)" }}
          gap={{ base: 0, md: 4 }}
          mb={4}
        >
          <GridItem colSpan={1} h="10">
            <Text py={{ base: 0, md: 2 }}>{t("post_contains")}</Text>
          </GridItem>
          <GridItem colSpan={2} h="10">
            <Input placeholder={t("words")} maxW="400px" />
          </GridItem>
        </Grid>

        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(6, 1fr)" }}
          gap={{ base: 0, md: 4 }}
          mb={4}
        >
          <GridItem colSpan={1} h="10">
            <Text py={2}>{t("location")}</Text>
          </GridItem>
          <GridItem colSpan={2} h="10">
            <Select placeholder={t("select")} maxW="400px">
              <option>{t("iraq")}</option>
              <option>{t("uae")}</option>
              <option>{t("usa")}</option>
              <option>{t("canada")}</option>
            </Select>
          </GridItem>
        </Grid>

        <Text mt={8} fontWeight="bold" fontSize="xl">
          {t("select_dates")}
        </Text>
        <Divider mb={4} />
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(6, 1fr)" }}
          gap={{ base: 0, md: 4 }}
          mb={4}
        >
          <GridItem colSpan={1} h="10">
            <Text py={2}>{t("between")}</Text>
          </GridItem>
          <GridItem colSpan={2} h="10">
            <Input type="date" maxW="400px" />
          </GridItem>
          <GridItem colSpan={1} h="10">
            <Center display={{ base: "none", md: "flex" }}>
              <Text py={2}>{t("and")}</Text>
            </Center>

            <Text py={2} display={{ base: "block", md: "none" }}>
              {/* {t("and")} */}
            </Text>
          </GridItem>

          <GridItem colSpan={2} h="10">
            <Input type="date" maxW="400px" />
          </GridItem>
        </Grid>
        <Center>
          <Button
            fontSize="xl"
            color="secondary.lighter"
            bg="primary.main"
            rounded="5px"
            px={6}
            py={4}
            size="md"
            _hover={{
              bg: "primary.lighter",
            }}
          >
            {t("apply")}
          </Button>
        </Center>
      </FormControl>
    </PopoverBody>
  );
};

export default AdvancedSearch;
