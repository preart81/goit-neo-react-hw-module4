import css from './ImageCard.module.css';

export default function ImageCard({ thumb, full, alt }) {
  return (
    <img
      className={css.ImageCard}
      src={thumb}
      width="320"
      height="240"
      loading="lazy"
      alt={alt}
    />
  );
}
