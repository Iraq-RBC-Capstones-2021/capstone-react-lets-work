import Profile from "../../components/Profile/Profile";
import IdeaCard from "../../components/Account/IdeaCard";
import { Box, Stack, SimpleGrid, Center, Skeleton } from "@chakra-ui/react";
import { auth } from "../../firebase/firebase";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";
export default function Account() {
  const router = useRouter();

  useEffect(() => {
    if (!auth.currentUser) {
      router.push("/");
    }
  }, [router]);
  const dummy_data = [
    {
      date: "12 hours ago",
      ideaImage: "https://source.unsplash.com/random",
      title: "German telescope",
      userImage: "https://source.unsplash.com/random",
      username: "Bruce Lee",
      id: 1,
    },
  ];

  return !auth.currentUser ? (
    <Skeleton h="100%" size="100%" />
  ) : (
    <div>
      <Profile />
      <Stack
        bg="secondary.main"
        py={{ base: 8, md: 16 }}
        px={8}
        textAlign="center"
      >
        <Center>
          <Box p={4}>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={16}>
              {dummy_data.map((idea) => (
                <IdeaCard
                  key={idea.id}
                  date={idea.date}
                  ideaImage={idea.ideaImage}
                  title={idea.title}
                  userImage={idea.userImage}
                  username={idea.username}
                  ideaId={idea.id}
                />
              ))}
            </SimpleGrid>
          </Box>
        </Center>
      </Stack>
    </div>
  );
}
