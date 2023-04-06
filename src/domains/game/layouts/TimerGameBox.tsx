import { useState } from "react";
import { useDidUpdate } from "@toss/react";
import { css } from "@emotion/react";
import { useQueryClient } from "@tanstack/react-query";
import { useGameMutation } from "@/domains/query-hook/queries/game";
import Box from "@/domains/shared/component/layout/Box";
import Spacing from "@/domains/shared/component/Spacing";
import useTimer from "@/domains/shared/component/Timer/useTimer";
import TimerDisplay from "../components/TimerDisplay";
import TimerControl from "./TimerControl";
import Title from "@/domains/shared/component/Title";

interface TimerGameBoxProps {
  betAmount: number;
  userPoints: number;
  betAmountValidate: (amount: string) => void;
}

export default function TimerGameBox({
  betAmount,
  userPoints,
  betAmountValidate,
}: TimerGameBoxProps) {
  const numberedBetAmount = Number(betAmount);
  const [isMutating, setIsMutating] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const { isProcessing, currentTime, isReady } = useTimer();
  const queryClient = useQueryClient();
  const { mutate } = useGameMutation({
    onMutate: () => {
      setIsMutating(true);
    },
  });

  useDidUpdate(() => {
    if (!isProcessing && currentTime === 10.0) {
      setIsFailed(false);
      mutate(
        { result: "win", amount: numberedBetAmount },
        {
          onSettled: () => {
            queryClient.refetchQueries(["me"]);
            setIsMutating(false);
          },
        }
      );
    }
    if (!isProcessing && currentTime !== 10.0 && currentTime > 0) {
      setIsFailed(true);
      mutate(
        { result: "lose", amount: numberedBetAmount },
        {
          onSuccess: () => {
            const netPoints = userPoints - betAmount;
            if (netPoints === 0) {
              betAmountValidate("");
            }
          },
          onSettled: () => {
            queryClient.refetchQueries(["me"]);
            setIsMutating(false);
          },
        }
      );
    }
  }, [isProcessing, currentTime]);

  return (
    <Box title="Timer">
      {!isReady && !isProcessing ? (
        <div
          css={css`
            height: 20px;
            width: 100%;
            text-align: center;
            color: ${!isProcessing && isFailed && "red"};
          `}
        >
          {isFailed ? "Failed" : "Congratulations!"}
        </div>
      ) : (
        <div
          css={css`
            height: 20px;
            width: 100%;
            text-align: center;
            color: ${!isProcessing && isFailed && "red"};
          `}
        ></div>
      )}
      <TimerDisplay />
      <Spacing heightGap={20} />
      {numberedBetAmount >= 100 && !isMutating ? (
        <TimerControl isFailed={isFailed} />
      ) : (
        <Title
          text={isMutating ? "처리중..." : "100포인트 이상 베팅해주세요."}
        />
      )}
      <Spacing heightGap={20} />
    </Box>
  );
}
