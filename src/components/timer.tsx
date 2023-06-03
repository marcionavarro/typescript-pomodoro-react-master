import React from 'react';
import { secondsToMinute } from '../utils/second-to-minute';

interface Props {
  mainTime: number;
}

export function Timer(props: Props): JSX.Element {
  return (
    <div className="timer">{secondsToMinute(props.mainTime)}</div>
  );
}