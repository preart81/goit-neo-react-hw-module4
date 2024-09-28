import { useEffect, useState } from 'react';
import { fetchPhotos } from './services/api';
import Modal from 'react-modal';
Modal.setAppElement('#root');

import './App.css';
import ErrorMessages from './components/ErrorMessages/ErrorMessages';
import ImageGallery from './components/ImageGallery/ImageCard/ImageGallery';
import Loader from './components/Loader/Loader';
import LoadMore from './components/LoadMore/LoadMore';
import SearchBar from './components/SearchBar/SearchBar';

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

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  const handleImageClick = image => {
    setSelectedImage(image);
    openModal();
    // console.log(image);
  };

  // openModal();

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
        // style={modalCustomStyles}
        contentLabel="Image preview"
      >
        {selectedImage && (
          <>
            <div className="modal-loader">
              <p>Loading</p>
              <Loader />
            </div>
            <a
              href={selectedImage.links.html}
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="modal-image"
                src={selectedImage.urls.regular}
                alt={selectedImage.alt_description}
              />
            </a>
            <p className="image-info info-resolution">
              {selectedImage.width}×{selectedImage.height}
            </p>
            {/* <button onClick={closeModal}>Close</button> */}
          </>
        )}
      </Modal>
    </>
  );
}

export default App;
