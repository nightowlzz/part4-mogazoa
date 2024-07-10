/* eslint-disable no-bitwise */

// 문자열을 특정 숫자로 파싱하기 위한 해시 함수입니다.
function fnv1a(str: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i += 1) {
    hash ^= str.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0;
}

// 위 매커니즘을 이용해서 문자열을 0~1 사이의 소수로 만드는 함수입니다.
function stringToFraction(str: string): number {
  const hash = fnv1a(str);
  return (hash % 1000000) / 1000000;
}

export default stringToFraction;

// stringToFraction('string') 에서 나온 값을 배열 인덱스로 곱해서 인덱스로 사용합니다.
// 여러 색상 배열에서 하나를, 같은 이름일 경우 같은 색상을 사용하기 위해서 사용합니다.
