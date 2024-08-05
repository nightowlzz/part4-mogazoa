'use client';

import { Button } from '@/components/ui/button';
import React from 'react';
import { IoMdAdd } from 'react-icons/io';
import AddProductModal from './add-product-modal';
import { useSession } from 'next-auth/react';

const FloatAddButton = ({ isLoginServer }: { isLoginServer: boolean }) => {
  const { data: session, status } = useSession();

  const triggerButton = (
    <Button variant="circleBlue" size={'auto'} className="w-[60px] h-[60px] fixed bottom-8 right-8">
      <IoMdAdd color="white" size={30} />
    </Button>
  );

  const isLogin = isLoginServer || status === 'authenticated';

  return isLogin ? <AddProductModal triggerButton={triggerButton} /> : null;
};

export default FloatAddButton;
