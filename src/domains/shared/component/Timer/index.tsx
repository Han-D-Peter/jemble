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
  ref: MutableRefObject<{ value: number }>;
}

export default function Timer({
  children,
  decimal = 0,
  onStop,
  ref,
}: TimerProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const timeRef = useRef<NodeJS.Timer>();

  const toFixedCurrentTime = currentTime.toFixed(decimal);

  const timerStart = useCallback(() => {
    if (!timeRef.current) {
      timeRef.current = setInterval(() => {
        setCurrentTime((prev) => prev + Math.pow(1 / 10, decimal));
      }, 1000 / Math.pow(10, decimal));
    }
  }, [decimal]);

  const timerStop = useCallback(() => {
    if (onStop) {
      onStop(Number(toFixedCurrentTime));
    }
    clearInterval(timeRef.current);
    timeRef.current = undefined;
  }, [toFixedCurrentTime]);

  const timerReset = useCallback(() => {
    clearInterval(timeRef.current);
    setCurrentTime(0);
    timeRef.current = undefined;
  }, []);

  const timerContextValue = useMemo(() => {
    return { currentTime, timerStart, timerStop, timerReset };
  }, [currentTime, timerStart, timerStop, timerReset]);

  useImperativeHandle(ref, () => ({
    value: Number(toFixedCurrentTime),
  }));

  return (
    <TimerContext.Provider value={timerContextValue}>
      {children}
    </TimerContext.Provider>
  );
}
