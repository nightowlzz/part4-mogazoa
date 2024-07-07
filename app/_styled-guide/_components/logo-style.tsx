import Image from 'next/image';
import styles from '@/app/styles/logo-styles.module.scss';

export default function LogoStyle() {
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
