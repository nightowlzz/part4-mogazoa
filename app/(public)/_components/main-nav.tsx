'use client';
import { Button } from '@/components/ui/button';
import { CategoryResponse } from '@/types/data';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface NavProps {
  nav: CategoryResponse[] | undefined;
  category: string | null;
}

export default function MainNav({ nav, category }: NavProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleMainNav = (id: number) => {
    router.push(`/product?category=${id}`);
    queryClient.invalidateQueries({ queryKey: ['products', 'category'] });
  };
  return (
    <>
      {nav &&
        nav.map((nav, i) => (
          <Button
            key={nav.id}
            variant="nav"
            size="sm"
            className={
              String(category) === String(nav.id) ? 'border-[#353542] bg-[#252530] text-white' : ''
            }
            onClick={() => handleMainNav(nav.id)}
          >
            {nav.name}
          </Button>
        ))}
    </>
  );
}
