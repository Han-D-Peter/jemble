import { css } from "@emotion/react";
import { useGetMyUnion } from "@/domains/query-hook/queries/unions";
import NoneUnionContainer from "./NoneUnionContainer";

const unionContainerStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function UnionContainer() {
  const { data } = useGetMyUnion();
  return (
    <div css={unionContainerStyle}>{!data?.data && <NoneUnionContainer />}</div>
  );
}
