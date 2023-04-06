import useTimer from "@/domains/shared/component/Timer/useTimer";
import { css } from "@emotion/react";
import TimerResetButton from "../components/TimerResetButton";
import TimerStartButton from "../components/TimerStartButton";
import TimerStopButton from "../components/TimerStopButton";

interface TimerControlProps {
  isProcessing?: boolean;
  isFailed?: boolean;
}

export default function TimerControl({ isFailed }: TimerControlProps) {
  const { isProcessing, isReady } = useTimer();
  return (
    <div
      css={css`
        width: 100%;
      `}
    >
      {!isProcessing && isReady && <TimerStartButton />}
      {isProcessing && !isReady && <TimerStopButton />}
      {!isProcessing && !isReady && <TimerResetButton isFailed={isFailed} />}
    </div>
  );
}
