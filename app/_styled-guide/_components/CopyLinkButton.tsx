import { Button } from '@/components/ui/button';
import { MdShare } from 'react-icons/md';

export default function CopyLinkButton() {
  const copyToClipboard = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      console.log('URL copied to clipboard:', url);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  return (
    <Button asChild variant="iconBg" size="auto" onClick={copyToClipboard}>
      <MdShare color={'#9FA6B2'} size={18} />
    </Button>
  );
}
