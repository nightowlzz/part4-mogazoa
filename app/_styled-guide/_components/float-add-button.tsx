'use client';

import { Button } from '@/components/ui/button';
import React from 'react';
import { IoMdAdd } from 'react-icons/io';
import AddProductModal from './add-product-modal';

const FloatAddButton = () => {
  const triggerButton = (
    <Button variant="circleBlue" size={'auto'} className="w-[60px] h-[60px] fixed bottom-8 right-8">
      <IoMdAdd color="white" size={30} />
    </Button>
  );

  return (
    <>
      <AddProductModal triggerButton={triggerButton} />
    </>
  );
};

export default FloatAddButton;
