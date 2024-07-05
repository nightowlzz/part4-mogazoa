//USER

//내정보 조회도 동일타입
export interface UserInfo {
  updatedAt: Date;
  createdAt: Date;
  teamId: string;
  image?: string;
  description?: string;
  nickname: string;
  id: number;
  mostFavoriteCategory: {
    name: string;
    id: number;
  };
  averageRating: number;
  reviewCount: number;
  followeesCount: number;
  followersCount: number;
  isFollowing: boolean;
}

export interface ChangeMyInfoBody {
  description?: string;
  nickname: string;
  image?: string;
}

export interface ChangeMyInfoPayload {
  updatedAt: Date;
  createdAt: Date;
  teamId: string;
  image: string;
  description?: string;
  nickname: string;
  id: number;
}

// 랭킹 api 리턴의 타입은 아래 타입의 배열임
export interface RankingUserInfo {
  updatedAt: Date;
  createdAt: Date;
  teamId: string;
  image?: string;
  description?: string;
  nickname: string;
  id: number;
  reviewCount: number;
  followersCount: number;
}

//유저가 생성한 상품 목록, 리뷰한 상품 목록, 찜한 목록
//상품 목록조회,
export interface ProductsList {
  nextCursor: number | null;
  list: {
    writerId: number;
    categoryId: number;
    favoriteCount: number;
    reviewCount: number;
    rating: number;
    image?: string;
    name: string;
    id: number;
  }[];
}

//유저를 팔로우한 사람 목록, 유저가 팔로우한 사람 목록
export interface FollowerList {
  nextCursor: number | null;
  list: {
    followee: {
      updatedAt: Date;
      createdAt: Date;
      teamId: string;
      image?: string;
      description?: string;
      nickname: string;
      id: number;
    };
    id: number;
  }[];
}

//REVIEW

// 좋아요, 좋아요취소, 리뷰생성, 수정시 응답.
export interface ReviewPayload {
  user: {
    image: string;
    nickname: string;
    id: number;
  };
  reviewImages: {
    source: string;
    id: number;
  }[];
  productId: number;
  userId: number;
  updatedAt: Date;
  createdAt: Date;
  isLiked: boolean;
  likeCount: number;
  content: string;
  rating: number;
  id: number;
}

export interface DeleteReviewPayload {
  productId: number;
  userId: number;
  updatedAt: Date;
  createdAt: Date;
  likeCount: number;
  rating: number;
  content: string;
  id: number;
}

//PRODUCT

//목록 조회는 ProductsList

//상품 생성, 상품 수정 동일
export interface ProductPayload {
  categoryId: number;
  image?: string;
  description: string; //'상품 설명, 최소 10자 이상, 최대 500자 이하'
  name: string;
}

export interface ProductDetail {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  favoriteCount: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
  writerId: number;
  isFavorite: false;
  category: {
    id: number;
    name: string;
  };
  categoryMetric: {
    rating: number;
    favoriteCount: number;
    reviewCount: number;
  };
}

export interface ReviewList {
  nextCursor: 0;
  list: ReviewPayload[];
}

// 찜하기, 찜하기 취소 응답
export interface HeartItemPayload {
  updatedAt: Date;
  createdAt: Date;
  writerId: number;
  categoryId: number;
  favoriteCount: number;
  reviewCount: number;
  rating: number;
  image?: string;
  name: string;
  id: number;
  categoryMetric: {
    reviewCount: number;
    favoriteCount: number;
    rating: number;
  };
  category: {
    name: string;
    id: number;
  };
  isFavorite: boolean;
  description: string;
}

//Oauth
// 간편로그인 (구글 카카오) 응답.
export interface OauthPayload {
  createdAt: Date;
  updatedAt: Date;
  appKey: string;
  provider: string;
  teamId: string;
  id: number;
}

//Image
//이미지 업로드, 프로젝트에 저장하는 이미지들은 이 엔드포인트를 통해 업로드한 후 url을 획득하여 사용합니다.
export interface UploadImagePayload {
  url: string;
}

//Follow
//팔로잉, 팔로우취소시 동일
export interface FollowPayload {
  updatedAt: Date;
  createdAt: Date;
  teamId: string;
  image?: string;
  description?: string;
  nickname: string;
  id: number;
  mostFavoriteCategory: {
    name: string;
    id: number;
  };
  averageRating: number;
  reviewCount: number;
  followeesCount: number;
  followersCount: number;
  isFollowing: boolean;
}

//Category
// get요청시 리턴은 아래 타입 배열입니다.
export interface CategoryInfo {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

//Auth
// 로그인, 회원가입, 간편로그인, 간편회원가입 동일
export interface AuthPayload {
  accessToken: string;
  user: {
    id: number;
    email: string;
    description: string;
    image?: string;
    teamId: string;
    nickname: string;
    updatedAt: Date;
    createdAt: Date;
  };
}
