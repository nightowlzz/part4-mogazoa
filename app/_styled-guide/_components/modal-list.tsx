import Compare from '@/components/modal/compare';
import Confirm from '@/components/modal/confirm';
import Product from '@/components/modal/product';
import Profile from '@/components/modal/profile';
import Review from '@/components/modal/review';

export default function ModalList() {
  return (
    <div className="flex gap-10 max-w-[1000px] m-auto">
      <Compare />
      <Confirm />
      <Review />
      <Product />
    </div>
  );
}
