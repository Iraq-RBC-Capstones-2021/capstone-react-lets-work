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
} from "@chakra-ui/react";
import { PhoneIcon, AtSignIcon } from "@chakra-ui/icons";
function Footer() {
  return (
    <HStack bg="#1C3341" color="white" top="8" spacing="24px">
      <Box padding="113px">
        <Stack>
          <Heading paddingBottom="25px">FAQ’s</Heading>
          <Accordion allowToggle>
            <AccordionItem border="none">
              <h2>
                <AccordionButton>
                  <AccordionIcon />
                  <Box flex="5" textAlign="left">
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
      <Box padding="70px">
        <Stack>
          <Heading> Lets Work</Heading>
          <HStack>
            <PhoneIcon />
            <Text>+964 750 000 00 00</Text>
          </HStack>
          <HStack>
            <AtSignIcon />
            <Text>letswork@gmail.com</Text>
          </HStack>
        </Stack>
      </Box>
      <Box padding="120px">
        <Stack>
          <Heading>Contact Us</Heading>
          <Text>Send us messages</Text>
          <Input variant="filled" placeholder="Name" />
          <Input variant="filled" placeholder="Email" />
          <Input as={Textarea} variant="filled" placeholder="Your Message" />
        </Stack>
      </Box>
    </HStack>
  );
}

export default Footer;
