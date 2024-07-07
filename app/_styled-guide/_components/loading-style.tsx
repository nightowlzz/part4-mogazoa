import Image from 'next/image';
import styles from '@/app/styles/loading-style.module.scss';

export default function LoadingStyle() {
  return (
    <Image
      src="/assets/images/loading.svg"
      alt="Loading"
      className={styles.loading}
      width={87}
      height={84}
    ></Image>
  );
}
