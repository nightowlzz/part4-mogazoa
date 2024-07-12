'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { usePostReview, useUpdateReview, useDeleteReview } from '@/hooks/review';
import { PostReviewRequest, UpdateReviewRequest } from '@/types/data';
import { FormField } from '../TestForm';

const ReviewTestPage: React.FC = () => {
  const [reviewId, setReviewId] = useState<number | null>(null);

  const postReview = usePostReview();
  const updateReview = useUpdateReview(reviewId || 0);
  const deleteReview = useDeleteReview(reviewId || 0);

  const { control: controlPost, handleSubmit: handleSubmitPost } = useForm<PostReviewRequest>();
  const { control: controlUpdate, handleSubmit: handleSubmitUpdate } =
    useForm<UpdateReviewRequest>();

  const onPostSubmit: SubmitHandler<PostReviewRequest> = (data) => {
    postReview(data);
  };

  const onUpdateSubmit: SubmitHandler<UpdateReviewRequest> = (data) => {
    if (reviewId) {
      updateReview(data);
    }
  };

  const handleDeleteReview = () => {
    if (reviewId) {
      deleteReview();
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Review Test Page</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Post Review</h2>
        <form onSubmit={handleSubmitPost(onPostSubmit)} className="space-y-4">
          <FormField
            name="productId"
            control={controlPost}
            label="Product ID"
            type="number"
            rules={{ required: 'Product ID is required' }}
          />
          <FormField
            name="content"
            control={controlPost}
            label="Content"
            rules={{ required: 'Content is required' }}
          />
          <FormField
            name="rating"
            control={controlPost}
            label="Rating"
            type="number"
            rules={{ required: 'Rating is required' }}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Post Review
          </button>
        </form>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Update Review</h2>
        <input
          type="number"
          value={reviewId || ''}
          onChange={(e) => setReviewId(Number(e.target.value))}
          placeholder="Review ID"
          className="mb-4 px-3 py-2 border rounded"
        />
        <form onSubmit={handleSubmitUpdate(onUpdateSubmit)} className="space-y-4">
          <FormField
            name="content"
            control={controlUpdate}
            label="Content"
            rules={{ required: 'Content is required' }}
          />
          <FormField
            name="rating"
            control={controlUpdate}
            label="Rating"
            type="number"
            rules={{ required: 'Rating is required' }}
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Update Review
          </button>
          <button
            type="button"
            onClick={handleDeleteReview}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewTestPage;
