'use client';
import styled from '@/app/(public)/_styles/main.module.scss';
import { cn } from '@/lib/utils';
import { ProductResponse } from '@/types/data';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';

export function Product({ id, name, image, rating, reviewCount, favoriteCount }: ProductResponse) {
  return (
    <Link
      href={`/product/${id}`}
      className="relative flex flex-col bg-black-500 rounded-lg md:rounded-xl border border-black-400 p-[10px]lg:p-2 w-full min-h-[180px] py-[48%] md:py-[50%] overflow-hidden"
    >
      <figure className="absolute inset-y-0 w-full">
        <div className={cn(styled['product-image'], 'relative w-full')}>
          <Image src={String(image)} alt={name} fill priority sizes={'400px auto'} />
        </div>
        <figcaption className="px-[10px] py-[10px] sm:px-[15px] sm:py-[15px] lg:px-[20px] lg:py-[20px]">
          <h2 className="text-white text-sm md:text-base lg:text-lg pb-1 whitespace-nowrap overflow-hidden text-ellipsis">
            {name}
          </h2>
          <div className="sm:flex sm:justify-between text-xs md:text-sm lg:text-base">
            <div className="flex gap-[10px] text-gray-600">
              <p>리뷰 {reviewCount}</p>
              <p>찜 {favoriteCount}</p>
            </div>
            <div className="flex justify-start items-center md:justify-center gap-[2px] text-gray-500 mt-[2px] sm:mt-0">
              <FaStar size={12} color="#FFC83C" className="md:w-[15px] md:h-[15px]" />
              {rating}
            </div>
          </div>
        </figcaption>
      </figure>
    </Link>
  );
}
