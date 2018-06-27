export interface IModalProps {
  message: string;
  type: ModalType;
  confirm: () => void;
  close: () => void;
}

export type ModalType = 'delete' | 'info';
