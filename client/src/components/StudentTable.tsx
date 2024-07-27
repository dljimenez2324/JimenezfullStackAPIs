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
import { useState } from "react";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import axios from "axios";
import { BASE_URL } from "../constant";
import ColorModeSwitch from "./ColorModeSwitch";
import StudentSkeleton from "./StudentSkeleton";


// interface to use the type of student data
export interface Student {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
}

const StudentTable = () => {
  
  // useStates below
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<Student>({} as Student);
  const [data, setData] = useState<Student[]>([]);
  const [error, setError] = useState("");
  
  // custom Chakra hook
  // const { isOpen, onOpen, onClose } = useDisclosure();

  // using toast from Chakra
  const toast = useToast();


  // helper functions such as fetching, saving, editing and deleting data
  const fetchData = () => {
      setIsLoading(true);
      axios
        .get(BASE_URL)
        .then(response => {
          setData(response.data);
        })
  }



  // to show the skeleton first we will use a conditional
  if (isLoading) return <StudentSkeleton/>;
  
  return (
    <>
        <ColorModeSwitch/>
        <Box m={14}>
        <Center>
          <Text fontSize="3xl">Student Directory</Text>
        </Center>
        {/* Table to hold Student Data */}
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
              </Tr>
              <Tr>
                <Td>feet</Td>
                <Td>centimetres (cm)</Td>
                <Td isNumeric>30.48</Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td isNumeric>0.91444</Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}

export default StudentTable