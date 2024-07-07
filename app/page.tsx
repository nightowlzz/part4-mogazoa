import UserProfile from './_styled-guide/_components/profile-style';

export default function Home() {
  return (
    <UserProfile
      image="/assets/images/example-profile.svg"
      nickname="surisuri마수리"
      description="세상에 리뷰 못할 제품은 없다. surisuri마수리와 함께라면 당신도 프로쇼핑러!
안녕하세요, 별점의 화신 surisuri마수리입니다!"
      followeesCount={762}
      followersCount={102}
    />
  );
}
