import React from 'react';
import { secondsToTime } from '../utils/second-to-time';

interface Props {
  mainTime: number;
}

export function Timer(props: Props): JSX.Element{
  return(
    <div className="timer">{secondsToTime(props.mainTime)}</div>
  );
}