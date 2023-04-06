import { css } from "@emotion/react";
import useTimer from "@/domains/shared/component/Timer/useTimer";

interface TimerDisplayProps {}

export default function TimerDisplay({}: TimerDisplayProps) {
  const { currentTime, decimal } = useTimer();
  return (
    <div
      css={css`
        width: 100%;
        display: flex;
        justify-content: center;
      `}
    >
      <div
        css={css`
          font-size: 60px;
        `}
      >
        {currentTime.toFixed(decimal)}
      </div>
    </div>
  );
}
