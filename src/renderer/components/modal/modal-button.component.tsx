import * as React from 'react';
import { Portal } from 'react-portal';
import { IModalButtonProps, IModalButtonState } from './modal-button.interface';

export class ModalButton extends React.Component<IModalButtonProps, IModalButtonState> {
  constructor(props) {
    super(props);
    this.state = { modalVisible: false };
  }

  /**
   * Sets the state of the modal to visible.
   */
  open = () => this.setState({ modalVisible: true });

  /**
   * Sets the state of the modal to hidden.
   */
  close = () => this.setState({ modalVisible: false });

  /**
   * Render the button with the classes and text specified.
   * Then render a conditional section to hide/show the modal
   * that should be displayed. The modal is given the function
   * that can hide itself.
   */
  render() {
    const { text, classes, modalDisplay } = this.props;
    return (
      <div>
        <button className={classes} onClick={this.open}>{text}</button>
        {this.state.modalVisible && (
          <Portal>
            {modalDisplay(this.close)}
          </Portal>
        )}
      </div>
    );
  }
}

