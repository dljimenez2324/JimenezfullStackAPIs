import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Text,
  Badge,
  useDisclosure,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  PopoverFooter,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import axios from "axios";
import { BASE_URL } from "../constant";
import ColorModeSwitch from "./ColorModeSwitch";
import StudentSkeleton from "./StudentSkeleton";
import StudentForm from "./StudentForm";

// interface to use the type of student data
export interface Student {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
}

const StudentTable = () => {
  // custom Chakra hook needed for opening and closing the modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // useStates below
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<Student>({} as Student);
  const [data, setData] = useState<Student[]>([]);
  const [error, setError] = useState("");

  // using toast from Chakra
  const toast = useToast();

  // helper functions such as fetching, saving, editing and deleting data
  const fetchData = () => {
    setIsLoading(true);
    axios
      .get(BASE_URL)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("The error is " + error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // console.log("This is the data: " + data);
  };

  // useEffect to run our fetch data on first load
  useEffect(() => {
    fetchData();
  }, []);

  // function for the edit icon
  const getStudent = (id: number) => {
    axios
      .get(BASE_URL + "/" + id)
      .then((response) => {
        setCurrentData(response.data);
        onOpen();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // function for delete icon
  const handleDelete = (id: number) => {
    axios
      .delete(BASE_URL + "/" + id)
      .then(() => {
        toast({
          title: "Student Deleted.",
          description: "Student deleted successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // refreshes the screen
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // adding new student function
  const handleAdd = () => {
    onOpen();
    setCurrentData({} as Student);
  };

  // to show the skeleton first we will use a conditional
  if (isLoading) return <StudentSkeleton />;

  return (
    <>
      <ColorModeSwitch />
      <Box m={10} shadow={"lg"} rounded={"md"}>
        <Flex justifyContent={"space-between"} px={"5"}>
          <Heading fontSize={30}>Student List</Heading>
          <Button
            onClick={() => handleAdd()}
            color="teal.300"
            leftIcon={<AddIcon />}
          >
            Add Student
          </Button>
        </Flex>
        <TableContainer borderWidth={3} m={4} rounded={10}>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Address</Th>
                <Th>Phone Number</Th>
                <Th>E-mail</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((student: Student) => (
                <Tr key={student.id}>
                  <Td>{student.id}</Td>
                  <Td>
                    <HStack>
                      <Avatar size={"sm"} name={student.name} />
                      <Text>{student.name}</Text>
                    </HStack>
                  </Td>

                  <Td>{student.address}</Td>
                  <Td>{student.phoneNumber}</Td>
                  <Td>{student.email}</Td>
                  <Td>
                    <HStack>
                      <EditIcon
                        boxSize={23}
                        color={"orange.200"}
                        onClick={() => getStudent(student.id)}
                      />
                      <Popover>
                        <PopoverTrigger>
                          <DeleteIcon boxSize={23} color={"red.400"} />
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverHeader>Caution!</PopoverHeader>
                          <PopoverBody>
                            Are you sure you want to delete {student.name}?
                          </PopoverBody>
                          <PopoverFooter>
                            <Button
                              colorScheme="red"
                              variant={"outline"}
                              onClick={() => handleDelete(student.id)}
                            >
                              Delete
                            </Button>
                          </PopoverFooter>
                        </PopoverContent>
                      </Popover>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        {data.length == 0 && (
          <Center>
            <Heading p={5} fontSize={24}>
              No Data
            </Heading>
          </Center>
        )}
        {/* When the modal is open */}
        {isOpen && (
          <StudentForm
            isOpen={isOpen}
            onClose={onClose}
            fetchStudent={fetchData}
            currentData={currentData}
          />
        )}
      </Box>
    </>
  );
};

export default StudentTable;
