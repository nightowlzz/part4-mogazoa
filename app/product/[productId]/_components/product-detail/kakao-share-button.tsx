import { Button } from '@/components/ui/button';
import { RiKakaoTalkFill } from 'react-icons/ri';

export default function KaKaoShareButton() {
  const handleShareToKakao = () => {
    const { Kakao, location } = window;
    Kakao.Share.sendScrap({
      requestUrl: location.href,
    });
  };

  return (
    <Button asChild variant="iconBg" size="auto" onClick={handleShareToKakao}>
      <RiKakaoTalkFill color={'#9FA6B2'} size={18} />
    </Button>
  );
}
