//USER

// 내정보 조회, 유저 정보 조회 응답
export interface UserResponse {
  updatedAt: string;
  createdAt: string;
  teamId: string;
  image?: string;
  description: string; // 미등록시 빈 문자열
  nickname: string;
  id: number;
  mostFavoriteCategory?: {
    name: string;
    id: number;
  };
  averageRating: number;
  reviewCount: number;
  followeesCount: number;
  followersCount: number;
  isFollowing: boolean;
}

// 내 정보 수정 요청
export interface UpdateUserRequest {
  description?: string;
  nickname?: string;
  image?: string;
}

// 내 정보 수정 응답
export interface UpdateUserResponse {
  updatedAt: string;
  createdAt: string;
  teamId: string;
  image?: string;
  description: string; // 미등록시 빈 문자열
  nickname: string;
  id: number;
}

// 랭킹 조회 응답
// ***get요청시 응답은 아래 타입의 배열입니다.***
export interface RankedUserResponse {
  updatedAt: string;
  createdAt: string;
  teamId: string;
  image?: string;
  description: string; // 미등록시 빈 문자열
  nickname: string;
  id: number;
  reviewCount: number;
  followersCount: number;
}

//유저가 생성한 상품 목록, 유저가 리뷰한 상품 목록, 유저가 찜한 상품 목록, 상품 조회 응답
export interface ProductsListResponse {
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

//유저를 팔로우한 사람 목록, 유저가 팔로우한 사람 목록 응답
export interface FollowersResponse {
  nextCursor: number | null;
  list: {
    followee: {
      updatedAt: string;
      createdAt: string;
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

// 리뷰 생성 요청
export interface PostReviewRequest {
  productId: number;
  images?: string[];
  content: string; // 필수입력
  rating: number; // 필수입력
}

// 리뷰 수정 요청
// 이미지를 수정할 때, 기존 이미지를 유지하려면 id를, 새로운 이미지를 추가하려면 source를 넣어주세요.
// 요청에 포함되지 않는 기존 이미지는 삭제됩니다.
export interface UpdateReviewRequest {
  images?: [
    {
      id: number;
    },
    {
      source: string;
    },
  ];
  content: string; // 필수입력
  rating: number; // 필수입력
}

// 좋아요, 좋아요취소, 리뷰생성, 수정시 응답.
export interface ReviewResponse {
  user: {
    image?: string;
    nickname: string;
    id: number;
  };
  reviewImages: {
    source: string;
    id: number;
  }[];
  productId: number;
  userId: number;
  updatedAt: string;
  createdAt: string;
  isLiked: boolean;
  likeCount: number;
  content: string;
  rating: number;
  id: number;
}

//리뷰 삭제 응답
export interface DeleteReviewResponse {
  productId: number;
  userId: number;
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  rating: number;
  content: string;
  id: number;
}

//PRODUCT

//목록 조회는 ProductsListResponse

//상품 등록, 상품 수정 요청 동일
export interface ProductUpdateRequest {
  categoryId: number; // 필수
  image: string; // 필수
  description: string; //'상품 설명, 최소 10자 이상, 최대 500자 이하'
  name: string;
}

//상품 생성, 상품 수정, 찜하기, 찜하기 취소 응답 동일
export interface ProductDetailResponse {
  updatedAt: string;
  createdAt: string;
  writerId: number;
  categoryId: number;
  favoriteCount: number;
  reviewCount: number;
  rating: number;
  image: string;
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

// 상품 상세 조회 응답
export interface ProductDetailResponse {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  favoriteCount: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  writerId: number;
  isFavorite: boolean;
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

// 상품 리뷰 목록 조회 응답
export interface ReviewListResponse {
  nextCursor: number | null;
  list: ReviewResponse[];
}

//Oauth
// 간편로그인 (구글 카카오)
export interface OauthRequest {
  appKey: string;
  provider: string;
}
export interface OauthResponse {
  createdAt: string;
  updatedAt: string;
  appKey: string;
  provider: string;
  teamId: string;
  id: number;
}

//Image
//body에 formData 쓰면 될거같습니다
//이미지 업로드, 프로젝트에 저장하는 이미지들은 이 엔드포인트를 통해 업로드한 후 url을 획득하여 사용합니다.

export interface UploadImageResponse {
  url: string;
}

//Follow

//팔로잉, 팔로우취소시 요청
export interface FollowRequest {
  userId: number;
}

//팔로잉, 팔로우취소시 응답
export interface FollowResponse {
  updatedAt: string;
  createdAt: string;
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
// ***get요청시 응답은 아래 타입의 배열입니다.***
export interface CategoryResponse {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

//Auth

// 일반회원 회원가입 요청
export interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

// 간편 유저 회원가입 요청
export interface OauthSignUpRequest {
  nickname: string;
  redirectUri: string;
  token: string;
}

// 일반회원 로그인 요청
export interface SignInRequest {
  email: string;
  password: string;
}

// 간편 유저 로그인 요청
export interface OauthSignInRequest {
  redirectUri: string;
  token: string;
}

// 로그인, 회원가입, 간편로그인, 간편회원가입 응답
export interface AuthResponse {
  accessToken: string;
  user: {
    id: number;
    email: string;
    description: string; // 미등록시 빈 문자열
    image?: string;
    teamId: string;
    nickname: string;
    updatedAt: string;
    createdAt: string;
  };
}

export type HttpMethod = 'get' | 'post' | 'patch' | 'delete';

export interface Config {
  method?: HttpMethod;
  url?: string;
}

export interface RequestConfig<T> extends Config {
  data: T;
}

export interface Params {
  keyword?: string;
  category?: number;
  order?: 'recent' | 'rating' | 'reviewCount';
  cursor?: number;
}
