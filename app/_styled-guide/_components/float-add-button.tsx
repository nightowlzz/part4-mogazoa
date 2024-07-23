'use client';

import Product from '@/components/modal/product';
import { Button } from '@/components/ui/button';
import React from 'react';
import { IoMdAdd } from 'react-icons/io';
import { Toaster, toast } from 'sonner';

const FloatAddButton = () => {
  const handleClick = () => {
    toast('구현중인 기능입니다');
  };
  return (
    <>
      <Toaster />
      <Button
        variant="circleBlue"
        size={'auto'}
        className="w-[60px] h-[60px] fixed bottom-8 right-8"
        onClick={handleClick}
      >
        <IoMdAdd color="white" size={30} />
      </Button>
      <Product />
    </>
  );
};

export default FloatAddButton;
