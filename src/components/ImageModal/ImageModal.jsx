import Loader from '../Loader/Loader';
import css from './ImageModal.module.css';

export default function ImageModal({ selectedImage }) {
  return (
    <>
      <div className={css.ModalLoader}>
        <p>Loading</p>
        <Loader />
      </div>
      <a href={selectedImage.links.html} target="_blank" rel="noreferrer">
        <img
          className={css.ModalImage}
          src={selectedImage.urls.regular}
          alt={selectedImage.alt_description}
        />
      </a>
      <p className={`${css.ImageInfo} ${css.InfoResolution}`}>
        {selectedImage.width}×{selectedImage.height}
      </p>
    </>
  );
}
