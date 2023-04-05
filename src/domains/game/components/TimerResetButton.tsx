import Button from "@/domains/shared/component/Button";
import useTimer from "@/domains/shared/component/Timer/useTimer";

interface TimerResetButtonProps {
  isFailed?: boolean;
}

export default function TimerResetButton({ isFailed }: TimerResetButtonProps) {
  const { resetTimer } = useTimer();
  return (
    <Button
      size="lg"
      fullWidth
      onClick={resetTimer}
      color={isFailed ? "#EF4A4A" : "#4B7FF0"}
    >
      {isFailed ? "Retry" : "Restart"}
    </Button>
  );
}
