'use client';
import styles from './TestPage.module.css';
import React, { useState } from 'react';
import { useSignUp, useSignIn, useOauthSignUp, useOauthSignIn } from '@/hooks/auth';
import { useGetCategories } from '@/hooks/category';
import { useFollowUser, useUnFollowUser } from '@/hooks/follow';
import { useUploadImage } from '@/hooks/image';
import { useRegisterOAuthApp } from '@/hooks/oauth';
import {
  useGetProducts,
  useGetProductDetail,
  useGetProductReviews,
  useCreateProduct,
  useUpdateProduct,
  useFavoriteProduct,
  useUnfavoriteProduct,
} from '@/hooks/product';
import {
  usePostReview,
  useUpdateReview,
  useDeleteReview,
  useLikeReview,
  useUnlikeReview,
} from '@/hooks/review';
import {
  useGetMyInfo,
  useUpdateMyInfo,
  useGetUserRanking,
  useGetUserInfo,
  useGetUserCreatedProducts,
  useGetUserReviewedProducts,
  useGetUserFavoriteProducts,
  useGetUserFollowees,
  useGetUserFollowers,
} from '@/hooks/user';
import Image from 'next/image';

const TestPage = () => {
  // 상태 변수들
  const [userId, setUserId] = useState(1);
  const [productId, setProductId] = useState(1);
  const [reviewId, setReviewId] = useState(1);

  // 폼 상태
  const [signUpForm, setSignUpForm] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordConfirmation: '',
  });
  const [signInForm, setSignInForm] = useState({ email: '', password: '' });
  const [productForm, setProductForm] = useState({
    categoryId: 1,
    name: '',
    description: '',
    image: '',
  });
  const [reviewForm, setReviewForm] = useState({ content: '', rating: 5 });
  const [oauthForm, setOauthForm] = useState({ nickname: '', token: '', redirectUri: '' });
  const [followForm, setFollowForm] = useState({ userId: 0 });
  const [imageForm, setImageForm] = useState({ file: null });
  const [oauthAppForm, setOauthAppForm] = useState({ appKey: '', provider: 'google' });

  // 결과 상태
  const [authResult, setAuthResult] = useState();
  const [productResult, setProductResult] = useState();
  const [reviewResult, setReviewResult] = useState();
  const [userResult, setUserResult] = useState();

  // 폼 제출 핸들러
  const handleSignUp = async (e) => {
    e.preventDefault();

    const result = await signUp(signUpForm);
    setAuthResult(result);
    console.log(authResult);
    if (result?.user && result?.user.id) {
      setUserId(result.user.id);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const result = await signIn(signInForm);
    setAuthResult(result);
    if (result?.user && result?.user.id) {
      setUserId(result.user.id);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    const result = await createProduct(productForm);
    setProductResult(result);
    if (result && result.id) {
      setProductId(result.id);
    }
  };

  const handlePostReview = async (e) => {
    e.preventDefault();
    if (productId === null) {
      alert('먼저 상품을 생성해주세요.');
      return;
    }
    const result = await postReview({ ...reviewForm, productId });
    setReviewResult(result);
    if (result && result.id) {
      setReviewId(result.id);
    }
  };

  const handleOAuthSignUp = async (e) => {
    e.preventDefault();
    const result = await oauthSignUp(oauthForm);
    setAuthResult(result);
  };

  const handleOAuthSignIn = async (e) => {
    e.preventDefault();
    const result = await oauthSignIn(oauthForm);
    setAuthResult(result);
  };

  const handleFollowUser = async (e) => {
    e.preventDefault();
    const result = await followUser(followForm);
    setUserResult(result);
  };

  const handleUnfollowUser = async (e) => {
    e.preventDefault();
    const result = await unfollowUser(followForm);
    setUserResult(result);
  };

  const handleRegisterOAuthApp = async (e) => {
    e.preventDefault();
    const result = await registerOAuthApp(oauthAppForm);
    setAuthResult(result);
  };

  // Auth 훅 테스트
  const signUp = useSignUp();
  const signIn = useSignIn();
  const oauthSignUp = useOauthSignUp('google');
  const oauthSignIn = useOauthSignIn('google');

  // Category 훅 테스트
  const { data: categories } = useGetCategories();

  // Follow 훅 테스트
  const followUser = useFollowUser();
  const unfollowUser = useUnFollowUser();

  // Image 훅 테스트
  const uploadImage = useUploadImage();

  const handleUploadImage = async (e) => {
    e.preventDefault();
    if (imageForm.file) {
      const formData = new FormData();
      formData.append('image', imageForm.file);
      try {
        const result = await uploadImage(formData);
        setProductResult(result);
      } catch (error) {
        console.error('Image upload failed:', error);
      }
    }
  };

  // OAuth 훅 테스트
  const registerOAuthApp = useRegisterOAuthApp();

  // Product 훅 테스트
  const { data: products } = useGetProducts();
  const { data: productDetail } = useGetProductDetail(productId);
  const { data: productReviews } = useGetProductReviews(productId);
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct(productId);
  const favoriteProduct = useFavoriteProduct(productId);
  const unfavoriteProduct = useUnfavoriteProduct(productId);

  // Review 훅 테스트
  const postReview = usePostReview();
  const updateReview = useUpdateReview(reviewId);
  const deleteReview = useDeleteReview(reviewId);
  const likeReview = useLikeReview(reviewId);
  const unlikeReview = useUnlikeReview(reviewId);

  // User 훅 테스트
  const { data: myInfo } = useGetMyInfo();
  const updateMyInfo = useUpdateMyInfo();
  const { data: userRanking } = useGetUserRanking();
  const { data: userInfo } = useGetUserInfo(userId);
  const { data: userCreatedProducts } = useGetUserCreatedProducts(userId);
  const { data: userReviewedProducts } = useGetUserReviewedProducts(userId);
  const { data: userFavoriteProducts } = useGetUserFavoriteProducts(userId);
  const { data: userFollowees } = useGetUserFollowees(userId);
  const { data: userFollowers } = useGetUserFollowers(userId);

  // 테스트 함수들
  const testSignUp = () =>
    signUp({
      email: 'test@test.com',
      nickname: 'test',
      password: 'password',
      passwordConfirmation: 'password',
    });
  const testSignIn = () => signIn({ email: 'test@test.com', password: 'password' });
  const testOAuthSignUp = () =>
    oauthSignUp({
      nickname: 'test',
      token: 'fake_token',
      redirectUri: '',
    });
  const testOAuthSignIn = () =>
    oauthSignIn({
      token: 'fake_token',
      redirectUri: '',
    });
  const testFollowUser = () => followUser({ userId });
  const testUnfollowUser = () => unfollowUser({ userId });
  const testUploadImage = () => {
    const formData = new FormData();
    formData.append('image', new Blob([''], { type: 'image/jpeg' }), 'test.jpg');
    uploadImage(formData);
  };
  const testRegisterOAuthApp = () => registerOAuthApp({ appKey: 'appKey', provider: 'google' });
  const testCreateProduct = () =>
    createProduct({ categoryId: 1, image: 'image.jpg', description: 'description', name: 'name' });
  const testUpdateProduct = () =>
    updateProduct({
      categoryId: 1,
      image: 'image.jpg',
      description: 'updated description',
      name: 'updated name',
    });
  const testPostReview = () => postReview({ productId, content: 'content', rating: 5 });
  const testUpdateReview = () => updateReview({ content: 'updated content', rating: 4 });
  const testUpdateMyInfo = () => updateMyInfo({ nickname: 'updated nickname' });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>커스텀 훅 테스트 페이지</h1>

      {/* 인증 테스트 섹션 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>인증 테스트</h2>

        <form onSubmit={handleSignUp}>
          <h3>회원가입</h3>
          <input
            type="email"
            placeholder="이메일"
            value={signUpForm.email}
            onChange={(e) => setSignUpForm({ ...signUpForm, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="닉네임"
            value={signUpForm.nickname}
            onChange={(e) => setSignUpForm({ ...signUpForm, nickname: e.target.value })}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={signUpForm.password}
            onChange={(e) => setSignUpForm({ ...signUpForm, password: e.target.value })}
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={signUpForm.passwordConfirmation}
            onChange={(e) => setSignUpForm({ ...signUpForm, passwordConfirmation: e.target.value })}
          />
          <button type="submit" className={styles.button}>
            회원가입
          </button>
        </form>

        <form onSubmit={handleSignIn}>
          <h3>로그인</h3>
          <input
            type="email"
            placeholder="이메일"
            value={signInForm.email}
            onChange={(e) => setSignInForm({ ...signInForm, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={signInForm.password}
            onChange={(e) => setSignInForm({ ...signInForm, password: e.target.value })}
          />
          <button type="submit" className={styles.button}>
            로그인
          </button>
        </form>

        <form onSubmit={handleOAuthSignUp}>
          <h3>OAuth 회원가입</h3>
          <input
            type="text"
            placeholder="닉네임"
            value={oauthForm.nickname}
            onChange={(e) => setOauthForm({ ...oauthForm, nickname: e.target.value })}
          />
          <input
            type="text"
            placeholder="토큰"
            value={oauthForm.token}
            onChange={(e) => setOauthForm({ ...oauthForm, token: e.target.value })}
          />
          <button type="submit" className={styles.button}>
            OAuth 회원가입
          </button>
        </form>

        <form onSubmit={handleOAuthSignIn}>
          <h3>OAuth 로그인</h3>
          <input
            type="text"
            placeholder="토큰"
            value={oauthForm.token}
            onChange={(e) => setOauthForm({ ...oauthForm, token: e.target.value })}
          />
          <button type="submit" className={styles.button}>
            OAuth 로그인
          </button>
        </form>

        <form onSubmit={handleRegisterOAuthApp}>
          <h3>OAuth 앱 등록</h3>
          <input
            type="text"
            placeholder="앱 키"
            value={oauthAppForm.appKey}
            onChange={(e) => setOauthAppForm({ ...oauthAppForm, appKey: e.target.value })}
          />
          <select
            value={oauthAppForm.provider}
            onChange={(e) => setOauthAppForm({ ...oauthAppForm, provider: e.target.value })}
          >
            <option value="google">Google</option>
            <option value="kakao">Kakao</option>
          </select>
          <button type="submit" className={styles.button}>
            OAuth 앱 등록
          </button>
        </form>

        <div className={styles.resultDisplay}>
          <h3>인증 결과:</h3>
          <p>{JSON.stringify(authResult)}</p>
        </div>
      </section>

      {/* 카테고리 테스트 섹션 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>카테고리 테스트</h2>
        <div className={styles.dataDisplay}>
          <h3>카테고리:</h3>
          <ul>
            {categories?.map((c) => (
              <li key={c.id}>{c.name}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 상품 테스트 섹션 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>상품 테스트</h2>

        <form onSubmit={handleCreateProduct}>
          <h3>상품 생성</h3>
          <select
            value={productForm.categoryId}
            onChange={(e) => setProductForm({ ...productForm, categoryId: Number(e.target.value) })}
          >
            {categories?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="상품명"
            value={productForm.name}
            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
          />
          <textarea
            placeholder="상품 설명"
            value={productForm.description}
            onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="이미지 URL"
            value={productForm.image}
            onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
          />
          <button type="submit" className={styles.button}>
            상품 생성
          </button>
        </form>

        <form onSubmit={handleUploadImage}>
          <h3>이미지 업로드</h3>
          <input
            type="file"
            onChange={(e) => setImageForm({ file: e.target.files ? e.target.files[0] : null })}
          />
          <button type="submit" className={styles.button}>
            이미지 업로드
          </button>
        </form>

        <button onClick={() => favoriteProduct()} className={styles.button}>
          상품 찜하기
        </button>
        <button onClick={() => unfavoriteProduct()} className={styles.button}>
          상품 찜하기 취소
        </button>

        <div className={styles.resultDisplay}>
          <h3>상품 생성 결과:</h3>
          <pre>{JSON.stringify(productResult, null, 2)}</pre>
          {productResult && (
            <div>
              <h4>생성된 상품 정보:</h4>
              <p>상품 ID: {productResult.id}</p>
              <p>상품명: {productResult.name}</p>
              <p>설명: {productResult.description}</p>
              <Image src={productResult.image} alt="상품 이미지" style={{ maxWidth: '200px' }} />
            </div>
          )}
        </div>

        <div className={styles.dataDisplay}>
          <h3>상품 목록:</h3>
          <ul>
            {products?.list.map((p) => (
              <li key={p.id}>{p.name}</li>
            ))}
          </ul>
        </div>

        <div className={styles.dataDisplay}>
          <h3>상품 상세:</h3>
          <pre>{JSON.stringify(productDetail, null, 2)}</pre>
        </div>
      </section>

      {/* 리뷰 테스트 섹션 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>리뷰 테스트</h2>

        <form onSubmit={handlePostReview}>
          <h3>리뷰 작성</h3>
          <textarea
            placeholder="리뷰 내용"
            value={reviewForm.content}
            onChange={(e) => setReviewForm({ ...reviewForm, content: e.target.value })}
          />
          <input
            type="number"
            min="1"
            max="5"
            value={reviewForm.rating}
            onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
          />
          <button type="submit" className={styles.button}>
            리뷰 작성
          </button>
        </form>

        <button onClick={() => deleteReview()} className={styles.button}>
          리뷰 삭제
        </button>
        <button onClick={() => likeReview()} className={styles.button}>
          리뷰 좋아요
        </button>
        <button onClick={() => unlikeReview()} className={styles.button}>
          리뷰 좋아요 취소
        </button>

        <div className={styles.resultDisplay}>
          <h3>리뷰 결과:</h3>
          <pre>{JSON.stringify(reviewResult, null, 2)}</pre>
        </div>

        <div className={styles.dataDisplay}>
          <h3>상품 리뷰:</h3>
          <ul>
            {productReviews?.list.map((r) => (
              <li key={r.id}>
                {r.content} - 평점: {r.rating}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 사용자 테스트 섹션 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>사용자 테스트</h2>

        <form onSubmit={handleFollowUser}>
          <h3>사용자 팔로우</h3>
          <input
            type="number"
            placeholder="사용자 ID"
            value={followForm.userId}
            onChange={(e) => setFollowForm({ userId: Number(e.target.value) })}
          />
          <button type="submit" className={styles.button}>
            팔로우
          </button>
        </form>

        <form onSubmit={handleUnfollowUser}>
          <h3>사용자 언팔로우</h3>
          <input
            type="number"
            placeholder="사용자 ID"
            value={followForm.userId}
            onChange={(e) => setFollowForm({ userId: Number(e.target.value) })}
          />
          <button type="submit" className={styles.button}>
            언팔로우
          </button>
        </form>

        <button onClick={testUpdateMyInfo} className={styles.button}>
          내 정보 업데이트
        </button>

        <div className={styles.dataDisplay}>
          <h3>내 정보:</h3>
          <pre>{JSON.stringify(myInfo, null, 2)}</pre>
        </div>

        <div className={styles.dataDisplay}>
          <h3>사용자 정보:</h3>
          <pre>{JSON.stringify(userInfo, null, 2)}</pre>
        </div>

        <div className={styles.dataDisplay}>
          <h3>사용자 생성 상품:</h3>
          <ul>
            {userCreatedProducts?.list.map((p) => (
              <li key={p.id}>{p.name}</li>
            ))}
          </ul>
        </div>

        <div className={styles.dataDisplay}>
          <h3>사용자 리뷰 상품:</h3>
          <ul>
            {userReviewedProducts?.list.map((p) => (
              <li key={p.id}>{p.name}</li>
            ))}
          </ul>
        </div>

        <div className={styles.dataDisplay}>
          <h3>사용자 찜한 상품:</h3>
          <ul>
            {userFavoriteProducts?.list.map((p) => (
              <li key={p.id}>{p.name}</li>
            ))}
          </ul>
        </div>

        <div className={styles.dataDisplay}>
          <h3>팔로잉:</h3>
          <ul>
            {userFollowees?.list.map((f) => (
              <li key={f.id}>{f.followee.nickname}</li>
            ))}
          </ul>
        </div>

        <div className={styles.dataDisplay}>
          <h3>팔로워:</h3>
          <ul>
            {userFollowers?.list.map((f) => (
              <li key={f.id}>{f.follower.nickname}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default TestPage;
