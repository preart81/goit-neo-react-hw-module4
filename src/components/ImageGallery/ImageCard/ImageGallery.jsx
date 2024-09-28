import ImageCard from './ImageCard';
import css from './ImageGallery.module.css';

export default function ImageGallery({ photos }) {
  return (
    <ul className={css.ImageGallery}>
      {photos.map(photo => (
        <li key={photo.id} className={css.ImageGalleryItem}>
          <ImageCard
            thumb={photo.urls.thumb}
            full={photo.urls.full}
            alt={photo.alt_description}
          />
        </li>
      ))}
    </ul>
  );
}
