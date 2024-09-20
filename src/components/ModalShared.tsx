import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
} from "@chakra-ui/react";
import { ReactNode } from "react";
interface IProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  confirmText: string;
  children: ReactNode;
  onSubmit: (event: React.FormEvent<HTMLDivElement>) => void;
  isLoading: boolean;
}

const ModalShared = ({
  isOpen,
  onClose,
  title,
  confirmText,
  children,
  onSubmit,
  isLoading
}: IProps) => {
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay
          bg={"blackAlpha.500"}
          backdropFilter={"blur(5px) hue-rotate(90deg)"}
        />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <Box as="form" onSubmit={onSubmit}>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
              <Button colorScheme="blue" ml={3} type="submit" isLoading ={isLoading}>
                {confirmText}
              </Button>
            </ModalFooter>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalShared;
