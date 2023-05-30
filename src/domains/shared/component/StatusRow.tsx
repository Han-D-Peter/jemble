import { css } from "@emotion/react";
import Image from "next/image";
import { commaizeNumber } from "@toss/utils";
import { ReactElement } from "react";

interface StatusRowProps {
  image: string | null;
  name: string;
  point: number;
  icon?: string | ReactElement;
}

const profileRowStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const profileNameStyle = css`
  ${profileRowStyle}
`;

const imageStyle = css`
  border-radius: 50%;
`;

const pointBoxStyle = css`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const iconBoxStyle = css`
  margin-left: 10px;
`;

export default function StatusRow({
  image,
  name,
  point,
  icon,
}: StatusRowProps) {
  return (
    <li>
      <div css={profileRowStyle}>
        <div css={profileNameStyle}>
          <Image
            css={imageStyle}
            src={image ?? "/images/defaulProfile.webp"}
            alt="프로필 사진"
            width={32}
            height={32}
          />
          <div
            css={css`
              width: auto;
              white-space: nowrap;
              margin: 5px;
              margin-bottom: 10px;
            `}
          >
            <span>{name}</span>
          </div>
        </div>
        <div css={pointBoxStyle}>
          <div>
            <span>{commaizeNumber(point)} Pt</span>
          </div>
        </div>
        <div css={iconBoxStyle}>{icon}</div>
      </div>
    </li>
  );
}
