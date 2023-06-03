import { zeroLeft } from './zero-left';

export function secondsToMinute(seconds: number): string{
  const min = zeroLeft((seconds / 60) % 60);
  const sec = zeroLeft((seconds % 60) % 60);
  return `${min}:${sec}`;
}