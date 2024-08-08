import axiosInstance from '@/utils/axiosInstance';

const getKakaoToken = async (code: any) => {
  try {
    const response = await axiosInstance.post('https://kauth.kakao.com/oauth/token', null, {
      params: {
        nickname: nickname,
        redirectUri: redirectUri,
        token: token,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching Kakao token:', error);
    throw new Error('Failed to fetch Kakao token');
  }
};

module.exports = { getKakaoToken };
