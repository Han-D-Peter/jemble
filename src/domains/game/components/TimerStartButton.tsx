import Button from "@/domains/shared/component/Button";
import useTimer from "@/domains/shared/component/Timer/useTimer";

interface TimerStartButtonProps {}

export default function TimerStartButton({}: TimerStartButtonProps) {
  const { startTimer } = useTimer();
  return (
    <Button fullWidth outline size="lg" onClick={startTimer}>
      START
    </Button>
  );
}
