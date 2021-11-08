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
  Image,
} from "@chakra-ui/react";
import NextImage from "next/image";
import { Search2Icon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { BiSliderAlt } from "react-icons/bi";
import AdvancedSearch from "../../components/Search/AdvancedSearch";
import Sort from "../../components/Search/Sort";
import PostList from "../../components/Home/posts/PostList";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/dist/client/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import GetGeoLocation from "../../components/GeoLocation/GetGeoLocation";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../store/posts/postsSlice";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "../../firebase/firebase";
import moment from "moment";
import {
  Pagination,
  usePagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  PaginationContainer,
  PaginationPageGroup,
} from "@ajna/pagination";
import CustomHead from "../../components/CustomHead";

export default function Search({ users }) {
  const { t } = useTranslation("search");
  const { locale } = useRouter();

  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.posts.allPosts);
  const [searchValue, setSearchValue] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  const [advanceSearch, setAdvanceSearch] = useState({
    apply: "notApplied",
    word: "",
    location: "",
    startDate: "",
    endDate: "",
  });
  const [posts, setPosts] = useState([]);
  const [geoLocation, setGeolocation] = useState({
    latidute: 0,
    longtitude: 0,
  });

  useEffect(() => {
    dispatch(getAllPosts());
    if (status === "success") {
      setPosts(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  function handleChangeSearch(event) {
    setSearchValue(event.target.value);
  }

  const sortFilter = (posts) => {
    switch (sortOption) {
      case "latest":
      case "oldest":
        return posts.sort((a, b) => {
          let dateA = new Date(a.createdAt).getTime();
          let dateB = new Date(b.createdAt).getTime();
          if (sortOption === "oldest") return dateA > dateB ? 1 : -1;
          return dateA < dateB ? 1 : -1;
        });

      case "most":
        return posts.sort((a, b) => b.likesCount - a.likesCount);
      default:
        return posts;
    }
  };

  const applyAdvanedSearch = (posts) => {
    if (advanceSearch.apply === "applied") {
      return posts.filter((post) => {
        const startDate = Date.parse(advanceSearch.startDate);
        const postCreatedDate = Date.parse(post.createdAt);
        const endDate = Date.parse(advanceSearch.endDate);
        return (
          post.description
            .toLowerCase()
            .includes(advanceSearch.word.toLowerCase()) ||
          (post.title
            .toLowerCase()
            .includes(advanceSearch.word.toLowerCase()) &&
            postCreatedDate <= endDate &&
            postCreatedDate >= startDate)
        );
      });
    }
    return posts;
  };

  let filteredPosts = sortFilter(
    applyAdvanedSearch(
      posts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    )
  );

  const { currentPage, setCurrentPage, pagesCount, pages } = usePagination({
    pagesCount: Math.ceil(filteredPosts.length / 6),
    initialState: { currentPage: 1 },
  });

  let sliceStartRange = (currentPage - 1) * 6;
  filteredPosts = filteredPosts.slice(sliceStartRange, sliceStartRange + 6);

  return (
    <Box w="100%" bg="secondary.main" py={4}>
      <CustomHead title="Search" />
      {/* /<GetGeoLocation /> */}
      <Stack>
        <Container mt={8}>
          <Center>
            <InputGroup size="md" mr={8}>
              <InputLeftElement height="100%">
                <Sort setSortOption={setSortOption} sortOption={sortOption} />
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
                <AdvancedSearch
                  setAdvanceSearch={setAdvanceSearch}
                  advanceSearch={advanceSearch}
                />
              </PopoverContent>
            </Popover>
          </Center>
        </Container>
      </Stack>
      {filteredPosts.length === 0 && status === "success" ? (
        <Center>
          <Image
            as={NextImage}
            src="images/noResult.png"
            width={{ base: "24rem", lg: "429px" }}
            alt=""
          />
        </Center>
      ) : (
        <PostList list="" posts={filteredPosts} users={users} />
      )}
      <Center my="5">
        <Pagination
          pagesCount={pagesCount}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        >
          <PaginationContainer>
            <PaginationPrevious>{t("previous")}</PaginationPrevious>
            <PaginationPageGroup>
              {pages.map((page) => (
                <PaginationPage key={`pagination_page_${page}`} page={page} />
              ))}
            </PaginationPageGroup>
            <PaginationNext>{t("next")}</PaginationNext>
          </PaginationContainer>
        </Pagination>
      </Center>
    </Box>
  );
}

export async function getStaticProps({ locale }) {
  try {
    const users = await (
      await getDocs(collection(db, "users"))
    ).docs.map((user) => {
      return user.data();
    });
    const newUsers = users.map((user) => {
      return {
        ...user,
        createdAt: moment(user.createdAt.toDate()).calendar(),
      };
    });
    return {
      props: {
        users: newUsers,
        ...(await serverSideTranslations(locale, ["search", "navbar"])),
      },
    };
  } catch (err) {
    return {
      props: {
        users: [],
        ...(await serverSideTranslations(locale, ["search", "navbar"])),
      },
      notFound: true,
    };
  }
}
