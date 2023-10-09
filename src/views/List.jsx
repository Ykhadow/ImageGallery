import { useCallback, useEffect, useState } from "react";
import ImageCard from "../components/ImageCard";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { getImageList } from "../services/images";
import { Link } from "react-router-dom";
import Error from "../components/Error";
import ReactSimpleImageViewer from "react-simple-image-viewer";
import Loader from "../components/Loader";

const List = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(0);
  const [prevPage, setPrevPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [error, setError] = useState(false);

  //For Image viewer
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  useEffect(() => {
    setImages([]);
    setError(false);
    setLoading(true);

    getImageList(currentPage, pageSize)
      .then((response) => {
        const linkHeader = response.headers.link;

        // Extract the page numbers using regular expressions
        const prevPageMatch = /<([^>]+)>; rel="prev"/.exec(linkHeader);
        const nextPageMatch = /<([^>]+)>; rel="next"/.exec(linkHeader);

        // Extract the page numbers from the matched URLs
        const prevPage = prevPageMatch
          ? new URL(prevPageMatch[1]).searchParams.get("page")
          : null;
        const nextPage = nextPageMatch
          ? new URL(nextPageMatch[1]).searchParams.get("page")
          : null;

        setPrevPage(prevPage);
        setNextPage(nextPage);

        setImages(response.data);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage]);

  return (
    <>
      <div className="md:p-40 p-12 bg-slate-100 min-h-screen">
        <div className="flex flex-row justify-between items-center flex-wrap gap-2">
          <div className="flex flex-row gap-6 items-center">
            <PhotoIcon className="h-8" />
            <h1 className="font-bold text-3xl">Images</h1>
          </div>

          <Link
            to="/"
            className="px-4 py-3 bg-black text-white rounded-lg hover:opacity-50 transition duration-200"
          >
            Home
          </Link>
        </div>

        {/* List of Images */}
        {images?.length > 0 && (
          <div className="flex flex-col md:flex-row flex-wrap gap-5 mt-14 mb-10">
            {images.map(({ id, author, url, download_url }, index) => (
              <ImageCard
                key={id}
                author={author}
                url={url}
                download_url={download_url}
                index={index}
                onClick={(index) => {
                  openImageViewer(index);
                }}
              />
            ))}
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center h-64">
            <Loader />
          </div>
        )}

        {/* Error Handling */}
        {error && (
          <div className="mb-12">
            <Error />
          </div>
        )}

        {/* Pagination Buttons */}
        <div className="flex w-full items-center justify-center gap-5">
          <button
            onClick={() => {
              if (prevPage) setCurrentPage(prevPage);
            }}
            disabled={!prevPage}
            className={`px-4 py-3 border ${
              prevPage
                ? "hover:bg-black border-black  hover:text-white transition duration-200 rounded-lg"
                : "disabled:border-gray-300 disabled:text-gray-300 rounded-lg "
            }`}
          >
            Previous
          </button>

          <button
            onClick={() => {
              if (nextPage) setCurrentPage(nextPage);
            }}
            disabled={!nextPage}
            className={`px-4 py-3 border ${
              nextPage
                ? "hover:bg-black border-black  hover:text-white transition duration-200 rounded-lg"
                : "disabled:border-gray-300 disabled:text-gray-300 rounded-lg "
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Image Viewer */}
      {isViewerOpen && (
        <ReactSimpleImageViewer
          src={images.map((obj) => obj["download_url"])}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          disableScroll={false}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)",
          }}
          closeOnClickOutside={true}
        />
      )}
    </>
  );
};

export default List;
