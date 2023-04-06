import {
  ReactNode,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  MutableRefObject,
} from "react";
import { TimerContext } from "./useTimer";

interface TimerProps {
  children: ReactNode;
  decimal?: 0 | 1 | 2 | 3;
  onStop?: (time: number) => void;
  ref?: MutableRefObject<{ value: number }>;
}

export default function Timer({
  children,
  decimal = 0,
  onStop,
  ref,
}: TimerProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReady, setIsReady] = useState(true);
  const timeRef = useRef<NodeJS.Timer>();

  const toFixedCurrentTime = currentTime.toFixed(decimal);

  const startTimer = useCallback(() => {
    if (!timeRef.current) {
      timeRef.current = setInterval(() => {
        setCurrentTime((prev) => prev + Math.pow(1 / 10, decimal));
      }, 1000 / Math.pow(10, decimal));
      setIsProcessing(true);
      setIsReady(false);
    }
  }, [decimal]);

  const stopTimer = useCallback(() => {
    if (onStop) {
      onStop(Number(toFixedCurrentTime));
    }
    clearInterval(timeRef.current);
    timeRef.current = undefined;
    setIsProcessing(false);
  }, [toFixedCurrentTime]);

  const resetTimer = useCallback(() => {
    clearInterval(timeRef.current);
    setCurrentTime(0);
    timeRef.current = undefined;
    setIsProcessing(false);
    setIsReady(true);
  }, []);

  const timerContextValue = useMemo(() => {
    return {
      currentTime: Number(toFixedCurrentTime),
      startTimer,
      stopTimer,
      resetTimer,
      isProcessing,
      isReady,
      decimal,
    };
  }, [
    currentTime,
    startTimer,
    stopTimer,
    resetTimer,
    isProcessing,
    isReady,
    decimal,
  ]);

  useImperativeHandle(ref, () => ({
    value: Number(toFixedCurrentTime),
  }));

  return (
    <TimerContext.Provider value={timerContextValue}>
      {children}
    </TimerContext.Provider>
  );
}
