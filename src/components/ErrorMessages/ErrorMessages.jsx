import css from './ErrorMessages.module.css';

export default function ErrorMessages({ errorText = 'Something went wrong' }) {
  return <div className={css.error}>{errorText}</div>;
}
