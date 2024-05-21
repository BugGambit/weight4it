import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useState, useCallback } from 'react';
import { queryClient } from './queryClient';
import { addWeight } from './supabase';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function SubmitWeightModal({ isOpen, onClose }: Props) {
  const [weight, setWeight] = useState<string>('80');
  const { mutate, isPending } = useMutation({
    mutationFn: addWeight,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['weight', 'get'] });
      onClose();
    },
  });

  const onWeightChange = useCallback((valueAsString: string) => {
    setWeight(valueAsString.replace(',', '.'));
  }, []);

  const onSubmit = useCallback(async () => {
    const weightAsNumber = Number(weight);
    if (Number.isNaN(weightAsNumber)) {
      return;
    }
    mutate(weightAsNumber);
  }, [weight]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Submit your weight</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isRequired>
            <FormLabel>Weight</FormLabel>
            <NumberInput
              isValidCharacter={(char) => /[0-9.,]/.test(char)}
              pattern="[0-9]+([,\.][0-9]+)?"
              min={0}
              max={500}
              precision={1}
              step={0.1}
              value={weight}
              onChange={onWeightChange}
              isDisabled={isPending}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={onSubmit}
            isLoading={isPending}
          >
            Submit
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
