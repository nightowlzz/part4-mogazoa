import { Button } from '@/components/ui/button';
import { MdShare } from 'react-icons/md';
import { toast } from 'sonner';

export default function CopyLinkButton() {
  const copyToClipboard = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      toast.success('URL이 복사되었습니다.');
    } catch (err) {
      toast.error('URL 복사에 실패하였습니다.');
    }
  };

  return (
    <Button asChild variant="iconBg" size="auto" onClick={copyToClipboard}>
      <MdShare color={'#9FA6B2'} size={18} />
    </Button>
  );
}
