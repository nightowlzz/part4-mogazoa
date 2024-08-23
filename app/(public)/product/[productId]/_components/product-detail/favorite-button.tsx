import { Button } from '@/components/ui/button';
import { useFavoriteProduct, useUnfavoriteProduct } from '@/hooks/product';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { IoIosHeart, IoMdHeartEmpty } from 'react-icons/io';
import { toast } from 'sonner';

interface FavoriteButtonProps {
  productId: number;
  isFavorite: boolean;
}

export default function FavoriteButton({
  productId,
  isFavorite: initialIsFavorite,
}: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorite);
  const queryClient = useQueryClient();

  const favoriteProduct = useFavoriteProduct(Number(productId), {
    onSuccess: () => {
      setIsFavorited(true);
      queryClient.invalidateQueries({ queryKey: ['productDetail', productId] });
    },
    onError: (error) => {
      toast.error('로그인이 필요합니다.');
      console.error('Failed to favorite product:', error);
    },
  });

  const unfavoriteProduct = useUnfavoriteProduct(Number(productId), {
    onSuccess: () => {
      setIsFavorited(false);
      queryClient.invalidateQueries({ queryKey: ['productDetail', productId] });
    },
    onError: (error) => {
      console.error('Failed to unfavorite product:', error);
    },
  });

  useEffect(() => {
    setIsFavorited(initialIsFavorite);
    queryClient.invalidateQueries({ queryKey: ['productDetail', productId] });
  }, [isFavorited, queryClient, productId, initialIsFavorite]);

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
