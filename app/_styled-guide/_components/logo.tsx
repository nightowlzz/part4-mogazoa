import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/">
      <div className="relative w-[112px] md:w-[138px] lg:w-[166px] h-[18px] md:h-[24px] lg:h-[28px]">
        <Image src="/assets/images/logo.svg" alt="Logo" fill priority />
      </div>
    </Link>
  );
}
