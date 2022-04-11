import { Component } from 'react';
import FetchImage from '../../services/fetchImage';
import ImageGalleryItem from '../ImageGalleryItem';
import Modal from '../Modal';
import Button from '../Button';
import Loader from '../Loader';
import ErrorNotification from '../ErrorNotification';
import s from './ImageGallery.module.scss';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    showModal: false,
    largeImageURL: null,
    loading: false,
    error: null,
    status: Status.IDLE,
  };
  componentDidUpdate(prevProps, prevState) {
    const { page, error } = this.state;
    const prevName = prevProps.searchImage;
    const nextName = this.props.searchImage;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName || prevPage !== nextPage) {
      this.setState({ status: Status.PENDING });
      FetchImage(nextName, nextPage)
        .then(data => {
          if (data.hits.length === 0) {
            this.setState({ error });
            this.resetPage();
          }
          this.setState(prevState =>
            page > 1
              ? {
                  images: [...prevState.images, ...data.hits],
                  status: Status.RESOLVED,
                }
              : { images: data.hits, status: Status.RESOLVED },
          );
        })
        .catch(error => {
          this.setState({ error, status: Status.REJECTED });
        });
    }
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  /*  if (prevName !== nextName) {
      this.setState({ loading: true, images: [] });

      FetchImage(nextName)
        .then(data => {
          if (data.hits.length > 0) {
            this.setState({ images: data.hits });
          }
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }

    if (prevPage !== nextPage) {
      this.setState({ loading: true });

      FetchImage(nextName, nextPage)
        .then(data => {
          this.setState(prev => ({ images: [...prev.images, ...data.hits] }));
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  } */
  resetPage = () => {
    this.setState({ page: 1 });
  };

  toglleModal = image => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: image,
    }));
  };
  onIncrementPage = event => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    const { error, largeImageURL, showModal, images, status /* loading */ } =
      this.state;

    return (
      <>
        {error && <ErrorNotification message={error.message} />}
        {images && (
          <ul className={s.imageGallery}>
            <ImageGalleryItem images={images} onClick={this.toglleModal} />
          </ul>
        )}
        {status === 'pending' && <Loader />}
        {images.length >= 12 && <Button onClick={this.onIncrementPage} />}
        {showModal && (
          <Modal image={largeImageURL} onCloseModal={this.toglleModal} />
        )}
      </>
    );
  }
}
export default ImageGallery;
