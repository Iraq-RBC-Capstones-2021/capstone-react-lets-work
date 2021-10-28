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

const AdvancedSearch = ({ setAdvanceSearch }) => {
  const { t } = useTranslation("search");
  const { locale } = useRouter();

  const handleAdvancedSearch = (e) => {
    e.preventDefault();
    setAdvanceSearch({
      word: e.target.word.value,
      location: e.target.location.value,
      dateRange: {
        start: e.target.dateStart.value,
        end: e.target.dateEnd.value,
      },
    });
  };

  return (
    <PopoverBody dir={locale === "ar" ? "rtl" : "ltr"}>
      <form id="country" onSubmit={handleAdvancedSearch}>
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
            <Input placeholder={t("words")} maxW="400px" name="word" />
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
          <GridItem colSpan={2} h="10" dir="ltr">
            <Select placeholder={t("select")} maxW="400px" name="location">
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
            <Input type="date" maxW="400px" name="dateStart" />
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
            <Input type="date" maxW="400px" name="dateEnd" />
          </GridItem>
        </Grid>
        <Center>
          <Button
            type="submit"
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
      </form>
    </PopoverBody>
  );
};

export default AdvancedSearch;
