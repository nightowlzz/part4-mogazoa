import { Ranking } from '@/app/ranking/ranking';
import { ReviewProfile } from './review-profile';
import { Follower } from './follower';
import { StatisticRating } from './statistics-rating';
import { StatisticFavorite } from './statistics-favorite';
import { StatisticReview } from './statistics-review';
import { ActivityRating } from './activity-rating';
import { ActivityReview } from './activity-review';
import { ActivityCategory } from './activity-category';
import { ProductCard } from './card-product';

export default function RankingPage() {
  return (
    <div className="bg-black-600">
      <Ranking />
      <ReviewProfile user={{ image: '', nickname: 'surisuri마수리' }} likeCount={5} />
      <Follower image="" nickname="surisuri마수리" />
      <StatisticRating rating={4.5} categoryMetric={{ rating: 4.3 }} />
      <StatisticFavorite favoriteCount={566} categoryMetric={{ favoriteCount: 112 }} />
      <StatisticReview reviewCount={4123} categoryMetric={{ reviewCount: 423 }} />
      <ActivityRating rating={4.5} />
      <ActivityReview reviewCount={123} />
      <ActivityCategory category={'전자기기'} />
      <ProductCard
        name="다이슨 슈퍼소닉 블루"
        image=""
        rating={4.5}
        reviewCount={12}
        favoriteCount={32}
      />
    </div>
  );
}
