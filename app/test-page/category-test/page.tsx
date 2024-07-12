'use client';

import React from 'react';
import { useGetCategories } from '@/hooks/category';

const CategoryTestPage: React.FC = () => {
  const { data: categories } = useGetCategories();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Category Test Page</h1>
      <ul>{categories?.map((category) => <li key={category.id}>{category.name}</li>)}</ul>
    </div>
  );
};

export default CategoryTestPage;
