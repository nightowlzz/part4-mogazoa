'use client';
import ContentEmpty from '@/components/content-empty';
import { Product } from '@/components/products/product';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetProducts } from '@/hooks/product';
import { ProductsListResponse } from '@/types/data';
import { InitialDataFunction } from '@tanstack/react-query';
interface ProductListProps {
  initialData: ProductsListResponse | InitialDataFunction<ProductsListResponse> | undefined;
}

export default function ProductList({ initialData }: ProductListProps) {
  const {
    data: products,
    isError,
    isPending,
  } = useGetProducts(undefined, { initialData: initialData });

  if (isError) return <div>isERROR</div>;

  if (isPending)
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-[15px] md:gap-5 opacity-50">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={'prod-list' + i} className="space-y-4">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[80%w]" />
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <>
      {products && products?.list.length !== 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-[15px] md:gap-5">
          {products?.list.slice(0, 6).map((card) => <Product key={card.id} {...card} />)}
        </div>
      ) : (
        <ContentEmpty />
      )}
    </>
  );
}
