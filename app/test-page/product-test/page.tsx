'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useGetProducts, useGetProductDetail, useCreateProduct } from '@/hooks/product';
import { ProductUpdateRequest } from '@/types/data';
import { FormField } from '../TestForm';

const ProductTestPage: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const { data: products, isLoading: productsLoading, error: productsError } = useGetProducts();
  const {
    data: productDetail,
    isLoading: detailLoading,
    error: detailError,
  } = useGetProductDetail(selectedProductId || 0, {});
  const createProduct = useCreateProduct();

  const { control, handleSubmit } = useForm<ProductUpdateRequest>();

  const onSubmit: SubmitHandler<ProductUpdateRequest> = (data) => {
    createProduct(data);
  };

  if (productsLoading) return <div>Loading products...</div>;
  if (productsError) return <div>Error loading products: {productsError.message}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Test Page</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Product List</h2>
        <ul>
          {products?.list.map((product) => (
            <li
              key={product.id}
              onClick={() => setSelectedProductId(product.id)}
              className="cursor-pointer hover:text-blue-500"
            >
              {product.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Product Detail</h2>
        {detailLoading && <div>Loading detail...</div>}
        {detailError && <div>Error loading detail: {detailError.message}</div>}
        {productDetail && <pre>{JSON.stringify(productDetail, null, 2)}</pre>}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Create New Product</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="name"
            control={control}
            label="Name"
            rules={{ required: 'Name is required' }}
          />
          <FormField
            name="categoryId"
            control={control}
            label="Category ID"
            type="number"
            rules={{ required: 'Category ID is required' }}
          />
          <FormField
            name="image"
            control={control}
            label="Image URL"
            rules={{ required: 'Image URL is required' }}
          />
          <FormField
            name="description"
            control={control}
            label="Description"
            rules={{ required: 'Description is required' }}
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductTestPage;
