import { createContext, useContext } from "react";

interface TimerContextType {
  currentTime: number;
  startTimer: () => void;
  stopTimer: (stoppedTime: number) => void;
  resetTimer: () => void;
  isProcessing: boolean;
  isReady: boolean;
  decimal: 0 | 1 | 2 | 3;
}

export const TimerContext = createContext<TimerContextType | null>(null);
TimerContext.displayName = "TimerContext";

const useTimer = () => {
  const context = useContext(TimerContext) as TimerContextType;

  const {
    currentTime,
    startTimer,
    stopTimer,
    resetTimer,
    isProcessing,
    isReady,
    decimal,
  } = context;

  return {
    currentTime,
    startTimer,
    stopTimer,
    resetTimer,
    isProcessing,
    isReady,
    decimal,
  } as const;
};

export default useTimer;
