import Gnb from '@/app/_styled-guide/_components/gnb';
import { Button } from '@/components/ui/button';
import { IoMdAdd } from 'react-icons/io';
import UserId from './page';

export default function UserIdLayout() {
  return (
    <>
      <Gnb />
      <Button
        variant="circleBlue"
        size={'auto'}
        className="w-[60px] h-[60px] fixed top-[642px] right-[20px] md:right-[30px] lg:right-[180px]"
      >
        <IoMdAdd color="white" size={30} />
      </Button>
      <UserId />
    </>
  );
}
