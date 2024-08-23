import { MAX_TEXTAREA_LENGTH } from '@/constants/limit';

export type TextWithMaxLength = {
  text: string;
  maxLength?: number;
};

function truncateText({ text, maxLength = MAX_TEXTAREA_LENGTH }: TextWithMaxLength): string {
  return text.length > maxLength ? text.slice(0, maxLength) : text;
}

// [NOTE] textarea 글자
export function limitText(params: TextWithMaxLength): string {
  return truncateText(params);
}
// [NOTE] textarea 글자 수
export function limitTextLength(params: TextWithMaxLength): number {
  return truncateText(params).length;
}

// [NOTE] 이미지 파일명 변경
export const renameFileWithExtension = (file: File) => {
  const extension = file.name.split('.').pop();
  const newFile = new File([file], `test.${extension}`, { type: file.type });
  return newFile;
};
