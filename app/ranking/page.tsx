import { Ranking } from '@/app/ranking/ranking';
import { ReviewProfile } from './review-profile';
import { Follower } from './follower';

export default function RankingPage() {
  return (
    <>
      <Ranking />
      <ReviewProfile />
      <Follower />
    </>
  );
}
