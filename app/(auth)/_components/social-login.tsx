import { Button } from '@/components/ui/button';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { AiOutlineGoogle } from 'react-icons/ai';

export default function SocialLogin() {
  return (
    <div className="text-center pt-[60px]">
      <h3 className="text-gray-600 font-base">SNS로 바로 시작하기</h3>
      <div className="flex items-center justify-center gap-5 pt-5">
        <Button variant="circleGary" className="w-[56px] h-[56px]" size="auto">
          <AiOutlineGoogle size="28" className="text-gray-600" />
        </Button>
        <Button variant="circleGary" className="w-[56px] h-[56px]" size="auto">
          <RiKakaoTalkFill size="28" className="text-gray-600" />
        </Button>
      </div>
    </div>
  );
}
