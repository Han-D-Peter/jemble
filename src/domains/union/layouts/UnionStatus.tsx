import { useGetMyUnion } from "@/domains/query-hook/queries/unions";
import DisplayPoint from "@/domains/shared/component/DisplayPoint";
import Box from "@/domains/shared/component/layout/Box";
import Spacing from "@/domains/shared/component/Spacing";
import SubTitle from "@/domains/shared/component/SubTitle";
import Title from "@/domains/shared/component/Title";
import { getOrdinal } from "@/domains/shared/utils/utils";
import { css } from "@emotion/react";

const rightFlexStyle = css`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const rightAlignText = css`
  font-size: 16px;
  text-align: right;
  color: #6b6a6a;
`;

export default function UnionStatus() {
  const { data } = useGetMyUnion();

  if (!data?.data) return <Title text="Not Found" />;
  return (
    <Box>
      <Spacing heightGap={15} />
      <SubTitle text="유니온 보유 포인트" />
      <DisplayPoint point={data?.data?.points} unit="Pt" />
      <div css={rightFlexStyle}>
        <div>
          <div css={rightAlignText}>{getOrdinal(data.data.rank + 1)}</div>
          <div css={rightAlignText}>{data.data.user.length}/20 명</div>
        </div>
      </div>
      <Spacing heightGap={25} />
    </Box>
  );
}
