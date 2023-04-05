import { ChangeEvent, useRef, useState } from "react";
import Input from "@/domains/shared/component/Input";
import Box from "@/domains/shared/component/layout/Box";
import Spacing from "@/domains/shared/component/Spacing";
import SubTitle from "@/domains/shared/component/SubTitle";
import Timer from "@/domains/shared/component/Timer";
import TimerGameBox from "./TimerGameBox";
import { css } from "@emotion/react";

export default function GameBox() {
  const betNumberRef = useRef<HTMLInputElement>(null);
  const [betAmount, setBetAmount] = useState<string>("1000");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBetAmount(e.target.value);
  };

  return (
    <div
      css={css`
        width: 100%;
      `}
    >
      <Timer decimal={1}>
        <TimerGameBox betAmount={betAmount} />
      </Timer>
      <Spacing heightGap={20} />
      <Box>
        <SubTitle text="베팅 포인트" />
        <Spacing heightGap={20} />
        <Input
          ref={betNumberRef}
          isOnlyNumber
          defaultValue={betAmount}
          onChange={onChange}
        />
        <Spacing heightGap={20} />
      </Box>
    </div>
  );
}
