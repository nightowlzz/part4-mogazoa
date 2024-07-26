import { MAX_TEXTAREA_LENGTH } from '@/constants/limit';

export type TextWithMaxLength = {
  text: string;
  maxLength?: number;
};

function truncateText({ text, maxLength = MAX_TEXTAREA_LENGTH }: TextWithMaxLength): string {
  return text.length > maxLength ? text.slice(0, maxLength) : text;
}

// textarea 글자
export function limitText(params: TextWithMaxLength): string {
  return truncateText(params);
}
// textarea 글자 수
export function limitTextLength(params: TextWithMaxLength): number {
  return truncateText(params).length;
}
