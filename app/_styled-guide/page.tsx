import InputStyle from './_components/input-style';
import ButtonStyle from './_components/button-style';

export default function StyledGuide() {
  return (
    <div className="bg-[#1C1C22] px-5 py-10 min-h-screen">
      <div className="max-w-[1000px] mx-auto">
        <h2 className="text-[30px] text-white">input</h2>
        <InputStyle />
        <br />
        <br />
        <br />
        {/* 버튼 */}
        <h2 className="text-[30px] text-white">버튼</h2>
        <ButtonStyle />
      </div>
    </div>
  );
}
