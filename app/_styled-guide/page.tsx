import InputStyle from './_components/input-style';
import ButtonStyle from './_components/button-style';
import { Dialog } from '@/components/ui/dialog';
import ModalList from './_components/modal-list';

export default function StyledGuide() {
  return (
    <div className="bg-[#1C1C22] px-5 py-10 min-h-screen">
      <div className="max-w-[1000px] mx-auto">
        <div className="py-10">
          <h2 className="text-[30px] text-white">Modal</h2>
          <ModalList />
        </div>
        <div className="py-10 hidden">
          <h2 className="text-[30px] text-white">Input</h2>
          <InputStyle />
        </div>
        <div className="py-10 hidden">
          {/* 버튼 */}
          <h2 className="text-[30px] text-white">Button</h2>
          <ButtonStyle />
        </div>
      </div>
    </div>
  );
}
