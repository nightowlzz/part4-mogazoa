import CategoryTag from '@/components/ui/tags/CategoryTag';

interface Category {
  id: number;
  name: string;
}

interface ActivityCategoryProps {
  mostFavoriteCategory: Category | null;
  className?: string;
}

export function ActivityCategory({ mostFavoriteCategory, className }: ActivityCategoryProps) {
  const { id, name } = mostFavoriteCategory || { id: -1, name: '' };
  return (
    <div className="flex flex-col items-center justify-center p-5 bg-black-500 rounded-xl border border-black-400 lg:p-[30px]">
      <h2 className="text-sm text-center text-gray-500 mb-[15px] lg:text-base lg:mb-[20px] break-keep">
        관심 카테고리
      </h2>
      {id === -1 ? (
        <div className="text-white text-sm">아직 관심 카테고리가 없어요</div>
      ) : (
        <CategoryTag categoryName={name} categoryId={id} className={className} />
      )}
    </div>
  );
}
