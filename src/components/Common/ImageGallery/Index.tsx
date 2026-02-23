import React from "react";

interface ImageGalleryProps {
  images: File[];
  previewImages: string[];
  onRemoveImage: (index: number, isPreview: boolean) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  previewImages,
  onRemoveImage,
}) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-2">Uploaded Images</h3>
      <div className="grid grid-cols-6 gap-4">
        {/* Display New Images */}
        {images.map((file, index) => (
          <div key={`uploaded-${index}`} className="relative group">
            <img
              src={URL.createObjectURL(file)}
              alt={`uploaded-${index}`}
              className="w-24 h-24 object-cover rounded"
            />
            <button
              type="button"
              onClick={() => onRemoveImage(index, false)}
              className="absolute top-0 right-0 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-red-600"
            >
              ✕
            </button>
          </div>
        ))}

        {/* Display Preview Images */}
        {previewImages.map((url, index) => (
          <div key={`preview-${index}`} className="relative group">
            <img
              src={url}
              alt={`preview-${index}`}
              className="w-24 h-24 object-cover rounded"
            />
            <span className="absolute top-0 left-0 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
              Preview
            </span>
            <button
              type="button"
              onClick={() => onRemoveImage(index, true)} // Pass `true` for preview images
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
