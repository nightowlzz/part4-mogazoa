import Image from 'next/image';

export default function Loading() {
  return (
    <div className="relative w-[79px] md:w-[87px] h-[73px] md:h-[84px]">
      <Image src="/assets/images/loading.svg" alt="Loading" fill priority />
    </div>
  );
}
