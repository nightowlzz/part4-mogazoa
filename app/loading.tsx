/* 
  [NOTE] 고정방식 
  
  - absolute: 컨포넌트 (부모에게 relative 주어야 함) 
  - fixed: 화면 전체
  
*/
const loadingImg = '/assets/images/loading-spinner.svg';

export default function Loading({ type = 'fixed' }: { type?: string }) {
  return (
    <div
      className={`${type === 'fixed' ? 'fixed' : type} left-0 top-0 w-full h-screen bg-black-600/70 z-50 flex items-center justify-center`}
    >
      <div>
        <img src={loadingImg} alt="로딩중" />
      </div>
    </div>
  );
}
