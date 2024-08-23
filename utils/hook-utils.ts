import { QueryParams } from '@/hooks/useInfinityScroll';

// [NOTE] useInfinityScroll 의 Prams 값 유무
export const addQueryParams = ({ order, keyword, category, cursor }: QueryParams) => {
  const queryParams = new URLSearchParams();
  if (cursor !== undefined) queryParams.append('cursor', cursor.toString());
  if (order !== undefined) queryParams.append('order', order);
  if (keyword !== undefined) queryParams.append('keyword', keyword);
  if (category !== undefined && !isNaN(category))
    queryParams.append('category', category.toString());

  return queryParams.toString() ? `?${queryParams.toString()}` : '';
};
