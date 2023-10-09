const ImageCard = ({ id, author, url, download_url, onClick, index }) => {
  return (
    <div className="md:w-56 h-72 rounded-2xl cursor-pointer overflow-hidden relative shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
      <div
        className="h-full w-full absolute top-0 left-0 opacity-0 transition-opacity duration-300 backdrop-blur-lg bg-opacity-20 bg-black hover:opacity-100"
        onClick={() => {
          onClick(index);
        }}
      >
        <div className="p-5 text-white">
          <p className="font-semibold text-lg">{author}</p>
        </div>
      </div>
      <div
        className="h-full w-full bg-center bg-cover"
        style={{
          objectFit: "fill",
          backgroundImage: `url(${download_url})`,
        }}
      />
    </div>
  );
};

export default ImageCard;
