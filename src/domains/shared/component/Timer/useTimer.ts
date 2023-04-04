import { createContext, useContext } from "react";

interface TimerContextType {
  currentTime: number;
  timerStart: () => void;
  timerStop: (stoppedTime: Date) => void;
  timerReset: () => void;
}

export const TimerContext = createContext<TimerContextType | null>(null);
TimerContext.displayName = "TimerContext";

const useTimer = () => {
  const context = useContext(TimerContext) as TimerContextType;

  const { currentTime, timerStart, timerStop, timerReset } = context;

  return { currentTime, timerStart, timerStop, timerReset } as const;
};

export default useTimer;
