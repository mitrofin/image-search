import { useState, useEffect } from 'react';
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

function ImageGallery({ searchImage }) {
  /* const [searchImage, setSearchImage] = useState(''); */
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  /* state = {
    images: [],
    page: 1,
    showModal: false,
    largeImageURL: null,
    loading: false,
    error: null,
    status: Status.IDLE,
  }; */

  useEffect(() => {
    if (searchImage === '') {
      return;
    }

    setStatus(Status.PENDING);

    FetchImage(searchImage, page)
      .then(data => {
        if (data.hits.length === 0) {
          setError(error);
          resetPage();
        }
        if (data.hits.length < 12) {
          setImages(data.hits);
          setStatus(Status.RESOLVED);
        }
        if (data.hits.length >= 12 && page >= 1) {
          setImages(prev => [...prev, ...data.hits]);
          setStatus(Status.RESOLVED);
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [searchImage, page, error]);
  /*   componentDidUpdate(prevProps, prevState) {
    
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
  } */

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
  const resetPage = () => {
    /* setSearchImage(''); */
    setPage(1);
  };

  const toglleModal = image => {
    setShowModal(!showModal);
    setLargeImageURL(image);
  };
  const onIncrementPage = event => {
    setPage(prevState => prevState + 1);
  };
  /*   const handleFormSubmit = searchImage => {
    resetPage();
    setSearchImage(searchImage);
  }; */

  return (
    <>
      {error && <ErrorNotification message={error.message} />}
      {images && (
        <ul className={s.imageGallery}>
          <ImageGalleryItem images={images} onClick={toglleModal} />
        </ul>
      )}
      {status === 'pending' && <Loader />}
      {images.length >= 12 && <Button onClick={onIncrementPage} />}
      {showModal && <Modal image={largeImageURL} onCloseModal={toglleModal} />}
    </>
  );
}
export default ImageGallery;
