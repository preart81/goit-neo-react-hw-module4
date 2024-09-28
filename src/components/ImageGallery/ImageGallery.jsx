import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

export default function ImageGallery({ photos, onImageClick }) {
  return (
    <ul className={css.ImageGallery}>
      {photos.map(photo => (
        <li
          key={photo.id}
          className={css.ImageGalleryItem}
          onClick={() => onImageClick(photo)}
        >
          <ImageCard thumb={photo.urls.small} alt={photo.alt_description} />
        </li>
      ))}
    </ul>
  );
}
