function CompareTable() {
  // (테스트용) 상품 2개의 Mock 데이터
  const tableMockData = [
    {
      id: 559,
      name: '맥북 -1세대 노트북',
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Mogazoa/user/269/1720528317887/%C3%AB%C2%A7%C2%A5%C3%AB%C2%B6%C2%81.png',
      rating: 0,
      reviewCount: 0,
      categoryId: 6,
      createdAt: '2024-07-09T12:32:50.383Z',
      updatedAt: '2024-07-09T12:32:50.383Z',
      writerId: 269,
      description: '삼성꺼보다 좋다! 맥북 초경량 뭐시기 뭐시기',
      teamId: '5-6',
      category: {
        id: 6,
        name: '식당',
      },
      favoriteCount: 0,
      isFavorite: false,
      categoryMetric: {
        rating: 0,
        reviewCount: 0,
        favoriteCount: 0,
      },
    },
    {
      id: 560,
      name: '맥북 -2세대 노트북',
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Mogazoa/user/269/1720528317887/%C3%AB%C2%A7%C2%A5%C3%AB%C2%B6%C2%81.png',
      rating: 0,
      reviewCount: 0,
      categoryId: 6,
      createdAt: '2024-07-09T12:33:19.272Z',
      updatedAt: '2024-07-09T12:33:19.272Z',
      writerId: 269,
      description: '삼성꺼보다 좋다! 맥북 초경량 뭐시기 뭐시기',
      teamId: '5-6',
      category: {
        id: 6,
        name: '식당',
      },
      favoriteCount: 0,
      isFavorite: false,
      categoryMetric: {
        rating: 0,
        reviewCount: 0,
        favoriteCount: 0,
      },
    },
  ];
  const result1 = '무승부';

  // 테이블 요소별 tailwind 스타일 속성 정의
  const tailwindStyle = {
    tableHeaderStyle: 'py-5 md:py-[0.938rem] w-1/4 text-xs md:text-sm lg:text-base',
    tableCompareStyle: 'py-5 md:py-[1.875rem] text-xs md:text-sm lg:text-base',
    tableDataStyle: 'py-5 md:py-[1.875rem] text-white text-xs md:text-sm lg:text-base',
  };

  return (
    <div className="px-5 md:px-[1.875rem]">
      <table className="w-full  lg:max-w-[58.75rem] rounded-xl text-center bg-black-450 text-gray-500">
        <thead className="border-b border-gray-700">
          <tr>
            <th className={tailwindStyle.tableHeaderStyle}>기준</th>
            <th className={tailwindStyle.tableHeaderStyle}>{tableMockData[0].name}</th>
            <th className={tailwindStyle.tableHeaderStyle}>{tableMockData[1].name}</th>
            <th className={tailwindStyle.tableHeaderStyle}>결과</th>
          </tr>
        </thead>
        {/* 데이터 배열 자르기 */}
        <tbody>
          <tr>
            <td className={tailwindStyle.tableCompareStyle}>별점</td>
            <td className={tailwindStyle.tableDataStyle}>{tableMockData[0].rating}</td>
            <td className={tailwindStyle.tableDataStyle}>{tableMockData[1].rating}</td>
            <td className={tailwindStyle.tableDataStyle}>{result1}</td>
          </tr>
          <tr>
            <td className={tailwindStyle.tableCompareStyle}>리뷰 개수</td>
            <td className={tailwindStyle.tableDataStyle}>{tableMockData[0].reviewCount}</td>
            <td className={tailwindStyle.tableDataStyle}>{tableMockData[1].reviewCount}</td>
            <td className={tailwindStyle.tableDataStyle}>{result1}</td>
          </tr>
          <tr>
            <td className={tailwindStyle.tableCompareStyle}>찜 개수</td>
            <td className={tailwindStyle.tableDataStyle}>{tableMockData[0].favoriteCount}</td>
            <td className={tailwindStyle.tableDataStyle}>{tableMockData[1].favoriteCount}</td>
            <td className={tailwindStyle.tableDataStyle}>{result1}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CompareTable;
