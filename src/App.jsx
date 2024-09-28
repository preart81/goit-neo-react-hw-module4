import './App.css';
import ErrorMessages from './components/ErrorMessages/ErrorMessages';
import ImageGallery from './components/ImageGallery/ImageCard/ImageGallery';
import Loader from './components/Loader/Loader';
import LoadMore from './components/LoadMore/LoadMore';
import SearchBar from './components/SearchBar/SearchBar';
import { useEffect, useState } from 'react';
import { fetchPhotos } from './services/api';

function App() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery) return;
    const getPhotos = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchPhotos(searchQuery, page);
        // console.log(data);
        setPhotos(prevState => [...prevState, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (error) {
        // console.log(error);
        console.log(error.message, error.response.data);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getPhotos();

    return () => {};
  }, [page, searchQuery]);

  const handleUpdateQuery = query => {
    setSearchQuery(query);
    setPage(1);
    setTotalPages(0);
    setPhotos([]);
  };

  return (
    <>
      <SearchBar onUpdateQuery={handleUpdateQuery} />

      {photos.length > 0 && <ImageGallery photos={photos} />}
      {error && <ErrorMessages />}
      {photos.length > 0 && (
        <p>
          Page: {page}/{totalPages}
        </p>
      )}
      {page < totalPages && (
        <LoadMore onLoadMore={() => setPage(prevState => prevState + 1)}>
          Load {isLoading ? <Loader /> : ' more'}
        </LoadMore>
      )}
    </>
  );
}

export default App;
