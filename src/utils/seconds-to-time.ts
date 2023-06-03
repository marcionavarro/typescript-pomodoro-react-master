import { zeroLeft } from './zero-left';

export function secondsToTime(seconds: number): string{
  const hours = zeroLeft(seconds / 360);
  const min = zeroLeft((seconds / 360) % 60);
  const sec = zeroLeft((seconds % 60) % 60);
  return `${hours}:${min}:${sec}`;
}