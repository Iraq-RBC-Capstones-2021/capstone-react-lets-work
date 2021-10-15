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

const AdvancedSearch = () => {
  return (
    <PopoverBody>
      <FormControl id="country">
        <Text mt={4} fontWeight="bold" fontSize="xl">
          Search Fields
        </Text>
        <Divider mb={4} />

        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(6, 1fr)" }}
          gap={{ base: 0, md: 4 }}
          mb={4}
        >
          <GridItem colSpan={1} h="10">
            <Text py={{ base: 0, md: 2 }}>Post Contains</Text>
          </GridItem>
          <GridItem colSpan={2} h="10">
            <Input placeholder="words..." maxW="400px" />
          </GridItem>
        </Grid>

        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(6, 1fr)" }}
          gap={{ base: 0, md: 4 }}
          mb={4}
        >
          <GridItem colSpan={1} h="10">
            <Text py={2}>Location</Text>
          </GridItem>
          <GridItem colSpan={2} h="10">
            <Select placeholder="Select country" maxW="400px">
              <option>Iraq</option>
              <option>United Arab Emirates</option>
              <option>USA</option>
              <option>Canada</option>
            </Select>
          </GridItem>
        </Grid>

        <Text mt={8} fontWeight="bold" fontSize="xl">
          Select Dates
        </Text>
        <Divider mb={4} />
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(6, 1fr)" }}
          gap={{ base: 0, md: 4 }}
          mb={4}
        >
          <GridItem colSpan={1} h="10">
            <Text py={2}>Between</Text>
          </GridItem>
          <GridItem colSpan={2} h="10">
            <Input type="date" maxW="400px" />
          </GridItem>
          <GridItem colSpan={1} h="10">
            <Center display={{ base: "none", md: "flex" }}>
              <Text py={2}>and</Text>
            </Center>

            <Text py={2} display={{ base: "block", md: "none" }}>
              and
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
            Apply Search
          </Button>
        </Center>
      </FormControl>
    </PopoverBody>
  );
};

export default AdvancedSearch;
