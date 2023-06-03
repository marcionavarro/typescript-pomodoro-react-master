import React, { useCallback, useEffect, useState } from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';
import { secondsToTime } from '../utils/second-to-time';

const bellStart = require('../sounds/src_sounds_bell-start.mp3');
const bellFinish = require('../sounds/src_sounds_bell-finish.mp3');

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.pomodoroTime);
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [cyclesQtdManager, setCyclesQtdManager] = useState(
    new Array(props.cycles).fill(true)
  );

  const [completedCycles, setCompletedCylcles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoro, setNumberOfPomodoro] = useState(0);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if(working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCounting ? 1000 : null,
  );

  const configureWork = useCallback(() => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.pomodoroTime);
    audioStartWorking.play();
  }, [
    setTimeCounting,
    setWorking,
    setResting,
    setMainTime,
    props.pomodoroTime
  ]);

  const configureRest = useCallback((Long: boolean) => {
    setTimeCounting(true);
    setWorking(false);
    setResting(true);

    if (Long) {
      setMainTime(props.longRestTime)
    } else {
      setMainTime(props.shortRestTime);
    }
    audioStopWorking.play();
  }, [
    setTimeCounting,
    setWorking,
    setResting,
    setMainTime,
    props.longRestTime,
    props.shortRestTime
  ]);

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');
    if (mainTime > 0) return;

    if (working && cyclesQtdManager.length > 0) {
      configureRest(false);
      cyclesQtdManager.pop();
    } else if (working && cyclesQtdManager.length <= 0) {
      configureRest(true);
      setCyclesQtdManager(new Array(props.cycles).fill(true));
      setCompletedCylcles(completedCycles + 1);
    }

    if (working) setNumberOfPomodoro(numberOfPomodoro + 1);
    if (resting) configureWork();

  }, [
    working,
    resting,
    completedCycles,
    configureRest,
    configureWork,
    cyclesQtdManager,
    numberOfPomodoro,
    mainTime,
    setCompletedCylcles,
    props.cycles
  ]);


  return <div className='pomodoro'>
    <h2>Voçê está: {working ? 'Trabalhando' : 'Descansando'}</h2>
    <Timer mainTime={mainTime} />

    <div className="controls">
      <Button text='Work' onClick={() => configureWork()}></Button>
      <Button text='Rest' onClick={() => configureRest(false)}></Button>
      <Button
        className={!working && !resting ? 'hidden' : ''}
        text={timeCounting ? 'Pause' : 'Play'}
        onClick={() => setTimeCounting(!timeCounting)}></Button>
    </div>

    <div className="details">
      <ol>
        <li>Ciclos concluidos: {completedCycles}</li>
        <li>Horas Trabalhadas: {secondsToTime(fullWorkingTime)}</li>
        <li>Pomodoros concluidos: {numberOfPomodoro}</li>
      </ol>
    </div>

  </div>
}