import Gnb from '@/app/_styled-guide/_components/gnb';
import { Button } from '@/components/ui/button';
import { getServerSession } from 'next-auth';
import { IoMdAdd } from 'react-icons/io';
import { authOptions } from '../api/auth/[...nextauth]/auth-options';
import MyPage from './page';

export default async function MyPageLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  return (
    <>
      <Gnb />
      <MyPage userId={userId} />
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
