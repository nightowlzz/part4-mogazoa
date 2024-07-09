import Image from 'next/image';
import styles from '@/components/ui/styles/loading.module.scss';

export default function Loading() {
  return (
    <Image
      src="/assets/images/loading.svg"
      alt="Loading"
      className={styles.loading}
      width={87}
      height={84}
    />
  );
}
