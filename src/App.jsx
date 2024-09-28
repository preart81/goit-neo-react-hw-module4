import { useEffect, useState } from 'react';
import { fetchPhotos } from './services/api';
import Modal from 'react-modal';
Modal.setAppElement('#root');

import './App.css';
import ErrorMessages from './components/ErrorMessages/ErrorMessages';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import LoadMore from './components/LoadMore/LoadMore';
import SearchBar from './components/SearchBar/SearchBar';
import ImageModal from './components/ImageModal/ImageModal';

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
    setSearchQuery(query);
    setPage(1);
    setTotalPages(0);
    setPhotos([]);
    closeModal();
  };

  // Modal

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setModalIsOpen(false);
  }

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

      <Modal
        className="Modal"
        overlayClassName="Overlay"
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Image preview"
      >
        {selectedImage && (
          <ImageModal selectedImage={selectedImage} />
          /* <button onClick={closeModal}>Close</button> */
        )}
      </Modal>
    </>
  );
}

export default App;
