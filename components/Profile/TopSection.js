import {
  Heading,
  Stack,
  HStack,
  Box,
  Text,
  Image,
  VStack,
  Button,
  Tag,
} from "@chakra-ui/react";
import { SiGmail, SiInstagram, SiFacebook, SiLinkedin } from "react-icons/si";

function TopSection() {
  return (
    <Stack>
      <Box bg="gray.200" px="150px" py="68px">
        <HStack spacing={50} alignContent="center">
          <Stack>
            <Image
              borderRadius="full"
              boxSize="180px"
              src="https://bit.ly/sage-adebayo"
              alt="Segun Adebayo"
            />
          </Stack>
          <Stack>
            <Heading fontSize={{ base: "25px", md: "27px" }}>
              Segun Adebayo
            </Heading>
            <Text color="gray.400" fontWeight="light">
              {" "}
              Web Developer
            </Text>
            <HStack align="center" spacing={2}>
              <SiGmail />
              <SiInstagram />
              <SiFacebook />
              <SiLinkedin />
            </HStack>
            <Text color="gray.400" fontWeight="light">
              {" "}
              I love Web development and I have been coding for last ten years
            </Text>
            <VStack align="flex-start">
              <Button bg="blue.400" color="white">
                Message
              </Button>
            </VStack>
          </Stack>
        </HStack>
      </Box>
      <Box paddingX="150px" paddingY="40px" margin="25px">
        <Heading paddingBottom="20px" fontSize={{ base: "25px", md: "27px" }}>
          Interests
        </Heading>
        <HStack spacing={4}>
          <Tag size="lg" variant="subtle">
            Web
          </Tag>
          <Tag size="lg" variant="subtle">
            Design
          </Tag>
          <Tag size="lg" variant="subtle">
            Html & JavaScript
          </Tag>
        </HStack>
      </Box>
      <Box paddingX="150px" paddingBottom="50px" spacing={25}>
        <Heading paddingBottom="20px" fontSize={{ base: "25px", md: "27px" }}>
          About
        </Heading>
        <Text>
          A mote of dust suspended in a sunbeam Sea of Tranquility vanquish the
          impossible shores of the cosmic ocean a billion trillion another
          world. Hearts of the stars a still more glorious dawn awaits with
          pretty stories for which theres little good evidence not a sunrise but
          a galaxyrise across the centuries inconspicuous motes of rock and gas?
          Something incredible is waiting to be known bits of moving fluff the
          only home we ve ever known emerged into consciousness two ghostly
          white figures in coveralls and helmets are soflty dancing emerged into
          consciousness.
        </Text>
      </Box>
      <Box bg="gray.200" px="150px" py="35px">
        <Heading paddingBottom="20px" fontSize={{ base: "25px", md: "27px" }}>
          Skills & Hobbies
        </Heading>
        <Text>Web development</Text>
        <Text>Hiking</Text>
      </Box>
    </Stack>
  );
}

export default TopSection;
