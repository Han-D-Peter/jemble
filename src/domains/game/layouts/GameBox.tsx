import { ChangeEvent, useRef, useState } from "react";
import { css } from "@emotion/react";
import Input from "@/domains/shared/component/Input";
import Box from "@/domains/shared/component/layout/Box";
import Spacing from "@/domains/shared/component/Spacing";
import SubTitle from "@/domains/shared/component/SubTitle";
import Timer from "@/domains/shared/component/Timer";
import TimerGameBox from "./TimerGameBox";
import { useMe } from "@/domains/query-hook/queries/users";

export default function GameBox() {
  const betNumberRef = useRef<HTMLInputElement>(null);
  const [betAmount, setBetAmount] = useState<string>("1000");
  const { data } = useMe();

  if (!data?.data) return <h1>Not Found</h1>;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const userPoint = data?.data?.me.points as number;
    const value = e.target.value;
    if (userPoint < Number(e.target.value)) {
      alert("베팅금액이 보유금액을 초과합니다.");
      setBetAmount(String(userPoint));
      return;
    }
    setBetAmount(value.replace(/[^\d]/g, ""));
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
          value={betAmount}
          onChange={onChange}
        />
        <Spacing heightGap={20} />
      </Box>
    </div>
  );
}
