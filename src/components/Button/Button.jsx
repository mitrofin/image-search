import PropTypes from 'prop-types';
import s from './Button.module.scss';

export default function Button({ onClick }) {
  return (
    <div className={s.buttonLoadContainer}>
      <button
        type="button"
        className={s.buttonLoad}
        onClick={onClick}
        aria-label="Load more"
      >
        Load more
      </button>
    </div>
  );
}

Button.propTypes = {
  incrementPage: PropTypes.func,
};
