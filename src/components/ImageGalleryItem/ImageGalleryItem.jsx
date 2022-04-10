import PropTypes, { object } from 'prop-types';
import s from './ImageGalleryItem.module.scss';

export default function ImageGalleryItem({ images, onClick }) {
  return (
    <>
      {images.map(image => (
        <li key={image.id} className={s.imageGalleryitem}>
          <img
            className={s.galleryItemImage}
            src={image.webformatURL}
            alt=""
            onClick={() => onClick(image.largeImageURL)}
          />
        </li>
      ))}
    </>
  );
}

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(object).isRequired,
  onClick: PropTypes.func.isRequired,
};
