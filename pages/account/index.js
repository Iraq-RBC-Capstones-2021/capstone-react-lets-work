import IdeaCard from "../../components/Account/IdeaCard";
import { Box, Stack, SimpleGrid, Center } from "@chakra-ui/react";

export default function Account() {
  const dummy_data = [
    {
      date: "12 hours ago",
      ideaImage: "/images/pexels-photo-2777898 2.png",
      title: "German telescope",
      userImage: "/images/Avatar.svg",
      username: "Bruce Lee",
    },
    {
      date: "12 hours ago",
      ideaImage: "/images/pexels-photo-834949 1.png",
      title: "German telescope",
      userImage: "/images/Avatar.svg",
      username: "Bruce Lee",
    },
    {
      date: "12 hours ago",
      ideaImage: "/images/pexels-photo-355948 2.png",
      title: "German telescope",
      userImage: "/images/Avatar.svg",
      username: "Bruce Lee",
    },
  ];

  return (
    <div>
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
                  key={idea.title}
                  date={idea.date}
                  ideaImage={idea.ideaImage}
                  title={idea.title}
                  userImage={idea.userImage}
                  username={idea.username}
                />
              ))}
            </SimpleGrid>
          </Box>
        </Center>
      </Stack>
    </div>
  );
}
