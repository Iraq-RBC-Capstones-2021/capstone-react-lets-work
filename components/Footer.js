import {
  Box,
  Stack,
  HStack,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Textarea,
  Input,
  Button,
  Image,
  Img,
} from "@chakra-ui/react";
import { PhoneIcon, AtSignIcon } from "@chakra-ui/icons";
import logo from "../public/images/logo.svg";
function Footer() {
  return (
    <HStack
      bg="#1C3341"
      p={["100px", "50px", "20px"]}
      color="white"
      spacing="18px"
      display={{ md: "flex" }}
    >
      <Box padding="50px" display={{ md: "flex" }}>
        <Stack>
          <Heading paddingBottom="25px" fontSize={{ base: "35px", md: "30px" }}>
            FAQ’s
          </Heading>
          <Accordion allowToggle>
            <AccordionItem border="none">
              <h2>
                <AccordionButton>
                  <AccordionIcon />
                  <Box flexShrink={2} textAlign="left">
                    How Are We Different?
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={2}>we are Different</AccordionPanel>
            </AccordionItem>

            <AccordionItem border="none">
              <h2>
                <AccordionButton>
                  <AccordionIcon />
                  <Box flex="1" textAlign="left">
                    Is This Platform Totally Free?
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>Yes, it is Totally free</AccordionPanel>
            </AccordionItem>
            <AccordionItem border="none">
              <h2>
                <AccordionButton>
                  <AccordionIcon />
                  <Box flex="1" textAlign="left">
                    What Services Do We Provide?
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>Lots of Services</AccordionPanel>
            </AccordionItem>
            <AccordionItem border="none">
              <h2>
                <AccordionButton>
                  <AccordionIcon Reverse />
                  <Box flex="1" textAlign="left">
                    Where Are We Located?
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>Lots of Services</AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Stack>
      </Box>
      <Box>
        <Stack padding="50px">
          <Img src={logo} alt="logo" />
          <HStack spacing={3}>
            <PhoneIcon />
            <Text>+964 750 000 00 00</Text>
          </HStack>
          <HStack spacing={3}>
            <AtSignIcon />
            <Text>letswork@gmail.com</Text>
          </HStack>
        </Stack>
      </Box>
      <Box padding="50px">
        <Stack>
          <Heading fontSize={{ base: "35px", md: "30px" }}>Contact us</Heading>
          <Text>Send us messages</Text>
          <Stack width="xs" display={{ md: "flex" }}>
            <Input
              variant="filled"
              placeholder="Name"
              display={{ base: "flex", md: "auto" }}
            />
            <Input variant="filled" placeholder="Email" />
            <Input as={Textarea} variant="filled" placeholder="Your Message" />
            <Button bg="blue.400">Submit</Button>
          </Stack>
        </Stack>
      </Box>
    </HStack>
  );
}

export default Footer;
