import { Component } from 'react';
import s from './Modal.module.scss';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onCloseModal();
    }
  };
  handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { image } = this.props;
    return (
      <div className={s.overlay} onClick={this.handleOverlayClick}>
        <div className={s.modal}>
          <img src={image} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
