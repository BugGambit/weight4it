import {
  Button,
  Center,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

type Props = {
  isOpen: boolean;
  imageSrc: string;
  onConfirm: () => void;
  onClose: () => void;
};

export function ConfirmUploadImageModal({
  isOpen,
  imageSrc,
  onConfirm,
  onClose,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload image?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <Image boxSize="150px" objectFit="scale-down" src={imageSrc} />
          </Center>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={onConfirm}>
            Upload
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
