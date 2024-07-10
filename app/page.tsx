import Review from './_styled-guide/_components/review';

export default function Home() {
  const reviewData = {
    user: {
      image: '/assets/images/example-profile.svg',
      nickname: 'surisuri마수리',
      id: 1,
    },
    reviewImages: [
      { id: 1, source: '/assets/images/example-review-image1.svg' },
      { id: 2, source: '/assets/images/example-review-image2.svg' },
    ],
    productId: 1,
    userId: 1,
    updatedAt: '2024-01-29',
    createdAt: '2024-01-29',
    isLiked: true,
    likeCount: 5,
    content:
      '음질 미칩니다ㅎㅎ 최고예용~ 어플 연동으로 음향 설정 및 설정모드 되고, 설정별로 사운드감이 틀려요 서라운드 느낌까지 들고, 따로는 베이스깐 우퍼 느낌도 있어요',
    rating: 0,
    id: 1,
  };

  return (
    <div>
      Home
      <Review {...reviewData} isSponsored={true} currentUserId={1} />
    </div>
  );
}
