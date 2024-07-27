import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  Input,
  Textarea,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { BASE_URL } from "../constant";
import axios from "axios";
import { Student } from "./StudentTable";

interface StudentFormProps {
  isOpen: boolean;
  onClose: () => void;
  fetchStudent: () => void;
  currentData?: Student;
}

const StudentForm = ({
  isOpen,
  onClose,
  fetchStudent,
  currentData,
}: StudentFormProps) => {
  // use toast
  const toast = useToast();

  // lets hardcode some data for our usestates and then add our data after
  const [student, setStudent] = useState({
    id: currentData?.id || 0,
    name: currentData?.name || "",
    address: currentData?.address || "",
    phoneNumber: currentData?.phoneNumber || "",
    email: currentData?.email || "",
  });

  // helper function to save inside the modal
  const onSave = () => {
    if (currentData?.id) {
      editStudent();
    } else {
      addStudent();
    }
  };

  // edit function
  const editStudent = () => {
    axios
      .put(BASE_URL + "/" + currentData?.id, student)
      .then(() => {
        onClose();
        fetchStudent();
        toast({
          title: "Student Updated.",
          description: "Student updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(student);
  };

  // add student function
  const addStudent = () => {
    axios
      .post(BASE_URL, student)
      .then((response) => {
        console.log(response);
        onClose();
        fetchStudent();
        toast({
          title: "Student Added.",
          description: "Student Added successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log(student);
  };

  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Student</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack gap={3} alignItems={"self-start"}>
                <Text>Name</Text>
              <Input
                type="text"
                placeholder="Name"
                value={student.name}
                onChange={(e) =>
                  setStudent({ ...student, name: e.target.value })
                }
              />
              <Text>Address</Text>
              <Textarea
                placeholder="Address"
                value={student.address}
                onChange={(e) =>
                  setStudent({ ...student, address: e.target.value })
                }
              />
              <Text>Phone Number</Text>
              <Input
                type="text"
                placeholder="Phone Number"
                value={student.phoneNumber}
                onChange={(e) =>
                  setStudent({ ...student, phoneNumber: e.target.value })
                }
              />
              <Text>E-mail</Text>
              <Input
                type="text"
                placeholder="E-mail"
                value={student.email}
                onChange={(e) =>
                  setStudent({ ...student, email: e.target.value })
                }
              />
            </VStack>
          </ModalBody>

          {/* line below will show the update in real time
              {JSON.stringify({student})} */}

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="green" onClick={onSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StudentForm;
