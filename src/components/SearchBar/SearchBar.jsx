import css from './SearchBar.module.css';

export default function SearchBar({ onUpdateQuery, children }) {
  const handleSubmit = event => {
    event.preventDefault();
    onUpdateQuery(event.target.query.value);
    event.target.reset();
  };

  return (
    <header className={css.SearchBar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <div className={css.SearchFormInputContainer}>
          <input
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            className={css.SearchFormInput}
          />
          <button type="submit" className={css.SearchFormButton}>
            🔍
          </button>
        </div>
        {children}
      </form>
    </header>
  );
}
