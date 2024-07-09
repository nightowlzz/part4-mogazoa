import StyledGuide from './_styled-guide/page';
import ProductCard from './_styled-guide/_components/product-card';
import Loading from './_styled-guide/_components/loading';
import Logo from './_styled-guide/_components/logo';

export default function Home() {
  return (
    <>
      <div>Home</div>
      <div>
        <ProductCard
          name="Sony WH-1000XM3"
          description="한층 업그레이드된 고급 노이즈 캔슬과 상황에 맞게 조정되는 스마트 청취 기능을 갖춘 WH-1000XM3 헤드폰으로 더욱 깊은 고요 속에서 청취할 수 있습니다."
          image="/assets/images/example-product.svg"
          category={{
            id: 1,
            name: '전자기기',
          }}
          writerId={1}
          currentUserId={2}
        />
      </div>
    </>
  );
}
