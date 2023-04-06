import { TIME_ATTACK_DIFFICULTY } from "@/constants/game";
import Box from "@/domains/shared/component/layout/Box";
import Spacing from "@/domains/shared/component/Spacing";
import SubTitle from "@/domains/shared/component/SubTitle";
import { getEarningValue } from "@/domains/shared/utils/utils";

export default function Guide() {
  return (
    <Box title="규칙">
      <SubTitle text={`1. 베팅은 최소 100Pt 부터 시작합니다.`} />
      <Spacing heightGap={5} />
      <SubTitle
        text={`2. 승리시 베팅 포인트의 ${getEarningValue(
          TIME_ATTACK_DIFFICULTY
        )}배를 획득합니다.`}
      />
      <Spacing heightGap={5} />
      <SubTitle text={`3. 패배시 베팅 포인트는 사라집니다.`} />
      <Spacing heightGap={5} />
      <SubTitle text={`4. 10.0초를 정확히 맞추면 승리!`} />
      <Spacing heightGap={20} />
      <Spacing heightGap={20} />
    </Box>
  );
}
