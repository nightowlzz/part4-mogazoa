'use client';
import { Button } from '@/components/ui/button';
import { CategoryResponse } from '@/types/data';

interface SideBarProps extends CategoryResponse {
  category: string | null;
  handleMainNav: ({ id, name }: { id: number; name: string }) => void;
}

export default function SideBar({ id, name, category, handleMainNav }: SideBarProps) {
  return (
    <Button
      key={id}
      variant="nav"
      size="sm"
      className={String(category) === String(id) ? 'border-[#353542] bg-[#252530] text-white' : ''}
      onClick={() => handleMainNav({ id, name })}
    >
      {name}
    </Button>
  );
}
