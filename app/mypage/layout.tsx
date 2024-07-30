import Gnb from '@/app/_styled-guide/_components/gnb';
import { Button } from '@/components/ui/button';
import { IoMdAdd } from 'react-icons/io';

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Gnb />
      {children}
      <Button
        variant="circleBlue"
        size={'auto'}
        className="w-[60px] h-[60px] fixed top-[642px] right-[20px] md:right-[30px] lg:right-[180px]"
      >
        <IoMdAdd color="white" size={30} />
      </Button>
    </>
  );
}
