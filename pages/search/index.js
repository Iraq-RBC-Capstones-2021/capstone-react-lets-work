import {
  Center,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  Input,
  Container,
  Stack,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  Box,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useState } from "react";
import { BiSliderAlt } from "react-icons/bi";
import AdvancedSearch from "../../components/Search/AdvancedSearch";
import Sort from "../../components/Search/Sort";
import PostList from "../../components/Home/posts/PostList";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/dist/client/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import GetGeoLocation from "../components/GeoLocation/GetGeoLocation";

export default function Search() {
  const { t } = useTranslation("search");
  const { locale } = useRouter();

  const postSample = [
    {
      createdAt: "posted 12/12/2021",
      description:
        "Hidden universe revealed in stunning first images from German telescope",
      imageURL: "https://source.unsplash.com/random",
      isCompleted: "false",
      likes: ["userId", "userId"],
      tags: ["Design", "Rocket", "Telescope"],
      title: "Coding challenge",
      userId: "",
      postId: "1",
    },

    {
      createdAt: "12/12/2021",
      description:
        "Hidden universe revealed in stunning first images from German telescope",
      imageURL: "https://source.unsplash.com/random/2",
      isCompleted: "false",
      likes: ["userId"],
      tags: ["Design", "Rocket", "Telescope"],
      title: "Coding challenge",
      userId: "",
      postId: "2",
    },

    {
      createdAt: "12/12/2021",
      description:
        "Hidden universe revealed in stunning first images from German telescope Hidden universe revealed in stunning first images from German telescope",
      imageURL: "",
      isCompleted: "false",
      likes: ["userId", "userId", "userId", "userId"],
      tags: ["Design", "Rocket", "Telescope"],
      title: "Health Care System",
      userId: "",
      postId: "3",
    },
  ];

  const [searchValue, setSearchValue] = useState("");
  const [geoLocation, setGeolocation] = useState({
    latidute: 0,
    longtitude: 0,
  });

  function handleChangeSearch(event) {
    setSearchValue(event.target.value);
  }

  const filteredPosts = postSample.filter((post) => {
    return post.title.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <Box w="100%" bg="secondary.main" py={4}>
      <GetGeoLocation />
      <Stack>
        <Container mt={8}>
          <Center>
            <InputGroup size="md" mr={8}>
              <InputLeftElement height="100%">
                <Sort />
              </InputLeftElement>
              <Input
                dir={locale === "ar" ? "rtl" : "ltr"}
                _focus={{ boxShadow: "none" }}
                borderColor="colors.darkPurple"
                borderBottomWidth="1.5px"
                pr="4.5rem"
                pl="3rem"
                type="text"
                placeholder={t("search")}
                variant="flushed"
                value={searchValue}
                onChange={handleChangeSearch}
              />

              <InputRightElement height="100%">
                <Button
                  pointerEvents="none"
                  height="80%"
                  bg="transparent"
                  _hover={{
                    background: "transparent",
                  }}
                >
                  <Search2Icon color="#babac2" />
                </Button>
              </InputRightElement>
            </InputGroup>
            <Popover>
              <PopoverTrigger>
                <IconButton // eslint-disable-next-line react/no-children-prop
                  children={<BiSliderAlt size="24" />}
                  size="sm"
                  bg="transparent"
                  _hover={{ bg: "transparent" }}
                  _active={{ bg: "transparent" }}
                  _focus={{ boxShadow: "none", background: "transparent" }}
                />
              </PopoverTrigger>
              <PopoverContent
                mx="10px"
                _focus={{ boxShadow: "lg" }}
                boxShadow="lg"
                width={{ base: "27rem", sm: "35rem", md: "40rem", lg: "46rem" }}
              >
                <PopoverArrow />
                <PopoverCloseButton />
                <AdvancedSearch />
              </PopoverContent>
            </Popover>
          </Center>
        </Container>
      </Stack>
      <PostList list="" posts={filteredPosts} />
    </Box>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["search"])),
    },
  };
}
