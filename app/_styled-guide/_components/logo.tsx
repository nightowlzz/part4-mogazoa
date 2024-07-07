import Image from 'next/image';
import styles from '@/components/ui/styles/logo.module.scss';

export default function Logo() {
  return (
    <Image
      src="/assets/images/logo.svg"
      alt="Logo"
      className={styles.logo}
      width={166}
      height={28}
    />
  );
}
