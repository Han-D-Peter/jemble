import { css } from "@emotion/react";
import { commaizeNumber } from "@toss/utils";

interface DisplayPointProps {
  point: number;
  unit?: string;
}

const displayStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

const unitTextStyle = css`
  font-size: 17px;
  margin-bottom: 10px;
  margin-left: 5px;
`;

export default function DisplayPoint({
  point,
  unit = "Pt",
}: DisplayPointProps) {
  const numberStyle = css`
    font-size: ${String(point).length > 8 ? 40 : 60}px;
  `;
  return (
    <div css={displayStyle}>
      <div css={numberStyle}>{commaizeNumber(point)}</div>
      <div css={unitTextStyle}>{unit}</div>
    </div>
  );
}
