'use client';

import React, { useState } from 'react';
import { useUploadImage } from '@/hooks/image';
import Image from 'next/image';

const ImageUploadTest = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = useUploadImage();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await uploadImage(formData);
      setUploadedImageUrl(response.url);
    } catch (err) {
      setError('Image upload failed. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Image Upload Test</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="file" onChange={handleFileChange} accept="image/*" className="mb-2" />
        <button
          type="submit"
          disabled={!file || isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          {isLoading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {uploadedImageUrl && (
        <div>
          <p className="mb-2">Uploaded Image URL:</p>
          <Image
            src={uploadedImageUrl}
            alt="Uploaded"
            className="max-w-full h-auto"
            width={100}
            height={100}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploadTest;
