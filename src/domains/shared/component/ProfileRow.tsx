import { css } from "@emotion/react";
import Image from "next/image";
import { commaizeNumber } from "@toss/utils";
import { ReactElement } from "react";

interface ProfileRowProps {
  image: string;
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

export default function ProfileRow({
  image,
  name,
  point,
  icon,
}: ProfileRowProps) {
  return (
    <li>
      <div css={profileRowStyle}>
        <div css={profileNameStyle}>
          <Image
            css={imageStyle}
            src={image}
            alt="프로필 사진"
            width={32}
            height={32}
          />
          <div
            css={css`
              margin: 5px;
              margin-bottom: 10px;
            `}
          >
            <span>{name}</span>
          </div>
        </div>
        <div css={pointBoxStyle}>
          <div>
            <span>{commaizeNumber(point)}</span>
          </div>
        </div>
        <div css={iconBoxStyle}>{icon}</div>
      </div>
    </li>
  );
}
