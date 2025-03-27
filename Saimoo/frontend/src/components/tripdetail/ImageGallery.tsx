const ImageGallery = ({ images, openImageModal }) => {
    return (
      <div className="mt-2 flex space-x-2 ml-3">
        {images.slice(0, 3).map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`place-image-${i}`}
            className="object-cover aspect-square cursor-pointer w-full max-w-[200px] h-[200px] rounded-2xl"
            onClick={() => openImageModal(images, i)}
          />
        ))}
      </div>
    );
  };
  
  export default ImageGallery;
  