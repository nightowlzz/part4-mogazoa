import { Button } from '@/components/ui/button';
import { useFavoriteProduct, useUnfavoriteProduct } from '@/hooks/product';
import { useState } from 'react';
import { IoIosHeart, IoMdHeartEmpty } from 'react-icons/io';
import { toast } from 'sonner';

interface FavoriteButtonProps {
  productId: number;
  initialIsFavorited: boolean;
}

export default function FavoriteButton({ productId, initialIsFavorited }: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);

  const favoriteProduct = useFavoriteProduct(Number(productId), {
    onSuccess: () => {
      setIsFavorited(true);
    },
    onError: (error) => {
      toast.error('로그인이 필요합니다.');
      console.error('Failed to favorite product:', error);
    },
  });

  const unfavoriteProduct = useUnfavoriteProduct(Number(productId), {
    onSuccess: () => {
      setIsFavorited(false);
    },
    onError: (error) => {
      console.error('Failed to unfavorite product:', error);
    },
  });

  const toggleFavorite = () => {
    if (isFavorited) {
      unfavoriteProduct.mutate();
    } else {
      favoriteProduct.mutate();
    }
  };

  return (
    <Button asChild variant="icon" size="auto" className="md:p-0.5 lg:p-0" onClick={toggleFavorite}>
      {isFavorited ? (
        <IoIosHeart color={'#FF0000'} size={24} className="hover:fill-[#ddd]" />
      ) : (
        <IoMdHeartEmpty color={'#9FA6B2'} size={24} className="hover:fill-[#ddd]" />
      )}
    </Button>
  );
}
