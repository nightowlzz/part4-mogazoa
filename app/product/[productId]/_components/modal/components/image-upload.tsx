import { Button } from '@/components/ui/button';
import { FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ChangeEvent } from 'react';
import { ImFilePicture } from 'react-icons/im';
import { IoCloseSharp } from 'react-icons/io5';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../styles/image-swiper.scss';
import { MAX_REVIEW_IMAGES_LENGTH } from '@/constants/limit';

interface ImageUploadProps {
  preview: string[] | { id?: number | undefined; source?: string | undefined }[];
  handlerImageFiles: (e: ChangeEvent<HTMLInputElement>) => void;
  handleImageDelete: (index: number) => void;
}

const getImageId = (img: string | { id?: number; source?: string }, index: number) => {
  return typeof img === 'string' ? index : img.id || index;
};

const getImageSource = (img: string | { id?: number; source?: string }) => {
  return typeof img === 'string' ? img : img.source || '';
};

export default function ImageUpload({
  preview,
  handlerImageFiles,
  handleImageDelete,
}: ImageUploadProps) {
  return (
    <Swiper
      slidesPerView={'auto'}
      spaceBetween={16}
      freeMode={true}
      modules={[FreeMode, Pagination]}
      className="mySwiper m-auto"
    >
      {preview.length < MAX_REVIEW_IMAGES_LENGTH && (
        <SwiperSlide className="max-w-[140px] md:max-w-[160px]">
          <div className="relative flex w-full h-[140px] md:h-[160px] flex-shrink-0">
            <Input
              id="reviewPicture"
              type="file"
              multiple
              accept="image/*"
              onChange={handlerImageFiles}
            />

            <FormLabel htmlFor="reviewPicture" variant="file" className="z-[1]">
              <span>
                <ImFilePicture className="text-gray-600" size={34} />
              </span>
            </FormLabel>
          </div>
        </SwiperSlide>
      )}
      {preview.map((img, i) => (
        <SwiperSlide key={getImageId(img, i)} className="max-w-[140px] md:max-w-[160px]">
          <li className="relative flex items-center justify-center  h-[140px] md:h-[160px]">
            <FormLabel
              htmlFor="reviewPicture"
              variant="file"
              className="z-[1]"
              style={{ backgroundImage: `url(${getImageSource(img)})` }}
            />
            <Button
              asChild
              variant="iconBg"
              size="auto"
              className="absolute right-1 top-1 flex items-center justify-center h-7 w-7 rounded-lg p-1 z-[2]"
              onClick={() => handleImageDelete(getImageId(img, i))}
            >
              <IoCloseSharp className="text-white" size={18} />
            </Button>
          </li>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
