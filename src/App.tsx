import React from 'react';
import { PomodoroTimer } from './components/pomodoro-timer';

function App(): JSX.Element {
  return (
    <div className="container">
      <PomodoroTimer
        pomodoroTime={10} // 1500
        shortRestTime={2} // 300
        longRestTime={5} // 900
        cycles={4} />
    </div>
  );
}

export default App;
