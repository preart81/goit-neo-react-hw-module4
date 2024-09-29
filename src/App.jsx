import { useEffect, useState } from 'react';
import { fetchPhotos } from './services/api';
import './App.css';
import ErrorMessages from './components/ErrorMessages/ErrorMessages';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import LoadMore from './components/LoadMore/LoadMore';
import SearchBar from './components/SearchBar/SearchBar';
import ImageModal from './components/ImageModal/ImageModal';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function App() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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
    if (!query) {
      iziToast.error({
        // title: 'Error',
        message: 'Please enter a query',
      });
      return;
    } else if (query === searchQuery) {
      iziToast.info({
        // title: 'Info',
        message: 'You entered the same query.',
      });
    } else {
      setSearchQuery(query);
      setPage(1);
      setTotalPages(0);
      setPhotos([]);
      closeModal();
    }
  };

  iziToast.settings({
    position: 'topRight',
    transitionIn: 'bounceInDown',
  });

  
  // Modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleImageClick = image => {
    setSelectedImage(image);
    openModal();
    // console.log(image);
  };

  return (
    <>
      <SearchBar onUpdateQuery={handleUpdateQuery} />

      {photos.length > 0 && (
        <ImageGallery photos={photos} onImageClick={handleImageClick} />
      )}
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
      {selectedImage && (
        <ImageModal
          selectedImage={selectedImage}
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
        />
      )}
    </>
  );
}

export default App;
