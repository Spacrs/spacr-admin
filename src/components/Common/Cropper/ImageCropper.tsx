import React, { useState, useRef, useEffect } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageCropper = ({
  imageSrc,
  onCropDone,
  onClose,
}: {
  imageSrc: string;
  onCropDone: (blob: Blob) => void;
  onClose: () => void;
}) => {
//   const [crop, setCrop] = useState<Crop>({
//     unit: "%",
//     width: 80,
//     aspect: 16 / 9,
//   });

  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 80,
    height: 45,
    x: 10,
    y: 10,
  });

  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const getCroppedImage = async () => {
    if (!completedCrop || !imgRef.current) return;

    const image = imgRef.current;
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = completedCrop.width!;
    canvas.height = completedCrop.height!;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.drawImage(
      image,
      completedCrop.x! * scaleX,
      completedCrop.y! * scaleY,
      completedCrop.width! * scaleX,
      completedCrop.height! * scaleY,
      0,
      0,
      completedCrop.width!,
      completedCrop.height!
    );

    canvas.toBlob((blob) => {
      if (blob) onCropDone(blob);
    }, "image/jpeg");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow max-w-4xl w-full">
        <div className="max-h-[70vh] overflow-auto">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={16 / 9}
            keepSelection={true}
          >
            <img
              ref={imgRef}
              src={imageSrc}
              alt="To Crop"
              className="max-w-full max-h-[70vh]"
            />
          </ReactCrop>
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={getCroppedImage}
          >
            Crop & Use
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
