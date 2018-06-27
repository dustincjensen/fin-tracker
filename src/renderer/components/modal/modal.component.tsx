import * as React from 'react';
import './modal.component.scss';
import { IModalProps, ModalType } from './modal.component.interface';

export class Modal extends React.Component<IModalProps> {
  render() {
    const { confirm, close, message, type } = this.props;
    return (
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="modal-content">
            {message}
          </div>
          <div className="modal-buttons">
            {this.getButtons(type, confirm, close)}
          </div>
        </div>
      </div>
    );
  }

  getButtons = (type: ModalType, confirm: () => void, close: () => void) => {
    switch (type) {
      case 'delete':
        return [
          <button key="modal-confirm" className="btn btn-danger btn-lg" onClick={() => confirm()}>Delete</button>,
          <button key="modal-cancel" className="btn btn-lg" onClick={() => close()}>Cancel</button>
        ];
      case 'info':
        return [
          <button key="modal-confirm" className="btn btn-primary" onClick={() => confirm()}>OK</button>
        ];
    }
  };
}
