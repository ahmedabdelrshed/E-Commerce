import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Divider,
} from "@chakra-ui/react";
import { ReactNode } from "react";
interface IModal {
  title: string;
  text: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  text,
  title,
  children,
}: IModal) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="white" textColor={"black"}>
          <ModalHeader>{title}</ModalHeader>
          <Divider color={"black"} />
          <ModalCloseButton />
          <ModalBody>{text}</ModalBody>
          {children}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfirmModal;
