import * as React from 'react';
import { Modal } from '../components/modal/modal.component';
import { IModalProps } from '../components/modal/modal.component.interface';

/**
 * A utility function to create a modal, so we don't
 * have to make a .container.ts file into a .tsx file
 * just to create a modal.s
 * @param modalProps the props to pass to the modal.
 */
export function createModal(modalProps: IModalProps): JSX.Element {
  return <Modal {...modalProps} />;
}
