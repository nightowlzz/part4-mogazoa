import axios, { AxiosResponse } from 'axios';

export const extractErrorMessage = (response: AxiosResponse): string => {
  if (response.headers['content-type']?.includes('application/json')) {
    const errorData = response.data;
    return errorData.message || JSON.stringify(errorData);
  }
  return response.statusText || '알 수 없는 오류가 발생했습니다.';
};

export function handleErrorResponse(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return extractErrorMessage(error.response);
    }
    if (error.request) {
      return '서버로부터 응답을 받지 못했습니다.';
    }
    return '요청 설정 중 오류가 발생했습니다: ' + error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return '알 수 없는 오류가 발생했습니다.';
}