import { css } from "@emotion/react";
import { useMyUnion } from "@/domains/query-hook/queries/unions";
import NoneUnion from "./NoneUnion";
import HasUnion from "./HasUnion";

const unionContainerStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function UnionContainer() {
  const { data } = useMyUnion();
  return (
    <div css={unionContainerStyle}>
      {!data?.data ? <NoneUnion /> : <HasUnion />}
    </div>
  );
}
