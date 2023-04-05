import { useEffect, useState } from "react";
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
  betAmount: string;
}

export default function TimerGameBox({ betAmount }: TimerGameBoxProps) {
  const numberedBetAmount = Number(betAmount);

  const [isFailed, setIsFailed] = useState(false);
  const { isProcessing, currentTime, isReady } = useTimer();
  const queryClient = useQueryClient();
  const { mutate } = useGameMutation();

  useEffect(() => {
    if (!isProcessing && currentTime === 10.0) {
      setIsFailed(false);
      mutate(
        { result: "win", amount: numberedBetAmount },
        {
          onSettled: () => {
            queryClient.refetchQueries(["me"]);
          },
        }
      );
    }
    if (!isProcessing && currentTime !== 10.0 && currentTime > 0) {
      setIsFailed(true);
      mutate(
        { result: "lose", amount: numberedBetAmount },
        {
          onSettled: () => {
            queryClient.refetchQueries(["me"]);
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
      {numberedBetAmount >= 1000 ? (
        <TimerControl isFailed={isFailed} />
      ) : (
        <Title text="1000포인트 이상 베팅해주세요." />
      )}
      <Spacing heightGap={20} />
    </Box>
  );
}
