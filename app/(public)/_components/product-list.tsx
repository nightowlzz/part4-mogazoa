'use client';
import ContentEmpty from '@/components/content-empty';
import { useGetProducts } from '@/hooks/product';
import { ProductsListResponse } from '@/types/data';
import { Product } from './product';
interface ProductListProps {
  initialData: ProductsListResponse | undefined;
}

export default function ProductList({ initialData }: ProductListProps) {
  const { data: products, isError, isPending } = useGetProducts(undefined, { initialData });
  console.log(products);
  if (isError) return <div>isERROR</div>;
  // [NOTE]:스켈레톤 작업
  if (isPending) return <div>로딩중</div>;

  return (
    <>
      <div className="grid grid-cols-2 2xl:grid-cols-3 gap-[15px] md:gap-5">
        {products?.list.slice(0, 6).map((card) => <Product key={card.id} {...card} />)}
      </div>
      {products?.list.length || <ContentEmpty />}
    </>
  );
}
