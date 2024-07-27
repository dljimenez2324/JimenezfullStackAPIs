import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Badge,
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constant";

// lets get our interface
interface Student {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
}

const StudentSkeleton = () => {
  
  // usestates to hold our data / states
  const [data, setData] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  // lets create the fetching data function
  const fetchData = () => {
    setIsLoading(true);
    axios
      .get(BASE_URL)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* Stuff below will be commented out for our Skeleton */}
      {/* <ColorModeSwitch /> */}
      <Box m={32} shadow={"lg"} rounded={"md"}>
        <Flex justifyContent={"space-between"} px={"5"}>
          <Heading>
            <Skeleton>Student Directory</Skeleton>
          </Heading>
          <Button color="teal.300" leftIcon={<AddIcon />}>
            {" "}
            <Skeleton>Add Student</Skeleton>
          </Button>
        </Flex>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>
                  <Skeleton>Id</Skeleton>
                </Th>
                <Th>
                  <Skeleton>Name</Skeleton>
                </Th>
                <Th>
                  <Skeleton>Address</Skeleton>
                </Th>
                <Th>
                  <Skeleton>Phone Number</Skeleton>
                </Th>
                <Th>
                  <Skeleton>Email</Skeleton>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <Tr key={index}>
                  <Td>
                    <Skeleton>01</Skeleton>
                  </Td>
                  <Td>
                    <HStack>
                      <SkeletonCircle>ID</SkeletonCircle>
                      <Text>
                        <Skeleton>Student Name</Skeleton>
                      </Text>
                    </HStack>
                  </Td>
                  
                  <Td>
                    <Skeleton>Student Email</Skeleton>
                  </Td>
                  <Td>
                    
                    <Badge>
                      <Skeleton>Yes</Skeleton>
                    </Badge>
                  </Td>
                  <Td>
                    <Skeleton>12345</Skeleton>
                  </Td>
                  <Td>
                    <HStack>
                      <SkeletonCircle>1</SkeletonCircle>
                      <SkeletonCircle>1</SkeletonCircle>
                      
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default StudentSkeleton;
