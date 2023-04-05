import Button from "@/domains/shared/component/Button";
import useTimer from "@/domains/shared/component/Timer/useTimer";

interface TimerStopButtonProps {}

export default function TimerStopButton({}: TimerStopButtonProps) {
  const { stopTimer, currentTime } = useTimer();
  return (
    <Button fullWidth size="lg" onClick={() => stopTimer(currentTime)}>
      STOP
    </Button>
  );
}
