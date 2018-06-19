import { Modal } from './modal.component';

export interface IModalButtonProps {
  text: string;
  classes: string;
  modalDisplay: (closeModal: () => void) => Modal;
}

export interface IModalButtonState {
  modalVisible: boolean;
}
